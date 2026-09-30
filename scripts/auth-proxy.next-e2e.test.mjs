import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { test } from "node:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createNetServer } from "node:net";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cookieName = "moveplus_session";
const sessionValue = "test.jwt.session";
const upstreamRequests = [];
let sessionActive = false;
let canManageAdmin = true;

const upstreamServer = createServer(async (request, response) => {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  upstreamRequests.push({
    method: request.method,
    url: request.url,
    cookie: request.headers.cookie,
    authorization: request.headers.authorization,
    body: Buffer.concat(chunks).toString("utf8"),
  });

  if (request.url === "/users/login" && request.method === "POST") {
    sessionActive = true;
    response.writeHead(200, {
      "content-type": "application/json",
      "set-cookie": `${cookieName}=${sessionValue}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=900`,
    });
    response.end(JSON.stringify({
      user: {
        id: 41,
        role: "ADMIN",
        token: "must-not-reach-javascript",
        name: "Conta de teste",
        email: "teste@example.com",
      },
    }));
    return;
  }

  const sessionCookie = request.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`));
  if (!sessionActive || sessionCookie !== `${cookieName}=${sessionValue}`) {
    response.writeHead(401, { "content-type": "application/json" });
    response.end(JSON.stringify({ message: "Sessão inválida" }));
    return;
  }

  if (request.url === "/auth/me" && request.method === "GET") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({
      name: "Conta de teste",
      email: "teste@example.com",
      phone: "11999999999",
      cpf: "12345678900",
      createdAt: "2026-01-01T00:00:00.000Z",
      capabilities: { manageAdmin: canManageAdmin },
    }));
    return;
  }

  if (request.url === "/events/my" && request.method === "GET") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify([{ id: 1, name: "Corrida" }]));
    return;
  }

  if (request.url === "/auth/logout" && request.method === "POST") {
    sessionActive = false;
    response.writeHead(200, {
      "content-type": "application/json",
      "set-cookie": `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
    });
    response.end(JSON.stringify({ success: true }));
    return;
  }

  response.writeHead(404, { "content-type": "application/json" });
  response.end(JSON.stringify({ message: "Not found" }));
});

upstreamServer.listen(0, "127.0.0.1");
await once(upstreamServer, "listening");
const upstreamAddress = upstreamServer.address();
const upstreamUrl = `http://127.0.0.1:${upstreamAddress.port}`;

test.after(async () => {
  upstreamServer.close();
  await once(upstreamServer, "close");
});

async function getFreePort() {
  const server = createNetServer();
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  server.close();
  await once(server, "close");
  return address.port;
}

async function waitForProxy(url, process) {
  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (process.exitCode !== null) {
      throw new Error(`Next dev exited before becoming ready (${process.exitCode})`);
    }
    try {
      const response = await fetch(`${url}/api/auth/me`);
      if (response.status === 401) return;
    } catch {
      // The dev server is still starting.
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }
  throw new Error("Next dev did not become ready within 90 seconds");
}

test("Next BFF preserves and revokes the backend cookie session", async () => {
  const frontendPort = await getFreePort();
  const frontendUrl = `http://127.0.0.1:${frontendPort}`;
  const nextProcess = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", String(frontendPort)],
    {
      cwd: projectRoot,
      env: {
        ...process.env,
        API_URL: upstreamUrl,
        NEXT_DIST_DIR: `.next/auth-proxy-test-${frontendPort}`,
        NODE_ENV: "development",
      },
      stdio: "ignore",
    },
  );

  try {
    await waitForProxy(frontendUrl, nextProcess);
    upstreamRequests.length = 0;
    const requestsBeforeAnonymousPage = upstreamRequests.length;

    const anonymousAdminPage = await fetch(`${frontendUrl}/admin/kits`, {
      redirect: "manual",
    });
    assert.equal(anonymousAdminPage.status, 307);
    assert.equal(anonymousAdminPage.headers.get("location"), "/");
    assert.equal(upstreamRequests.length, requestsBeforeAnonymousPage);

    const loginResponse = await fetch(`${frontendUrl}/api/users/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ identifier: "teste@example.com", password: "secret" }),
    });
    assert.equal(loginResponse.status, 200);
    const loginCookies = loginResponse.headers.getSetCookie();
    const loginCookie = loginCookies.find((cookie) => cookie.startsWith(`${cookieName}=${sessionValue};`));
    assert.ok(loginCookie);
    assert.match(loginCookie, /HttpOnly/i);
    assert.match(loginCookie, /Secure/i);
    assert.match(loginCookie, /SameSite=Lax/i);
    assert.match(loginCookie, /Path=\//i);
    assert.match(loginCookie, /Max-Age=900/i);

    const loginJson = await loginResponse.json();
    assert.deepEqual(loginJson, {
      user: { name: "Conta de teste", email: "teste@example.com" },
    });
    assert.doesNotMatch(JSON.stringify(loginJson), /token|role|"id"/i);
    assert.equal(upstreamRequests[0].cookie, undefined);
    assert.equal(upstreamRequests[0].authorization, undefined);

    const browserCookie = `${cookieName}=${sessionValue}`;
    const profileResponse = await fetch(`${frontendUrl}/api/auth/me`, {
      headers: {
        cookie: `${browserCookie}; analytics=must-not-forward`,
        authorization: "Bearer attacker-controlled-token",
      },
    });
    assert.equal(profileResponse.status, 200);
    assert.equal((await profileResponse.json()).capabilities.manageAdmin, true);
    assert.equal(upstreamRequests.at(-1).cookie, browserCookie);
    assert.equal(upstreamRequests.at(-1).authorization, undefined);

    canManageAdmin = false;
    const regularUserAdminPage = await fetch(`${frontendUrl}/admin/kits`, {
      headers: { cookie: browserCookie },
      redirect: "manual",
    });
    assert.equal(regularUserAdminPage.status, 307);
    assert.equal(regularUserAdminPage.headers.get("location"), "/");
    assert.equal(upstreamRequests.at(-1).url, "/auth/me");
    assert.equal(upstreamRequests.at(-1).cookie, browserCookie);

    canManageAdmin = true;
    const authorizedAdminPage = await fetch(`${frontendUrl}/admin/kits`, {
      headers: { cookie: browserCookie },
      redirect: "manual",
    });
    assert.equal(authorizedAdminPage.status, 200);
    assert.equal(upstreamRequests.at(-1).url, "/auth/me");
    assert.equal(upstreamRequests.at(-1).cookie, browserCookie);

    const protectedResponse = await fetch(`${frontendUrl}/api/events/my`, {
      headers: { cookie: browserCookie },
    });
    assert.equal(protectedResponse.status, 200);
    assert.deepEqual(await protectedResponse.json(), [{ id: 1, name: "Corrida" }]);
    assert.equal(upstreamRequests.at(-1).cookie, browserCookie);
    assert.equal(upstreamRequests.at(-1).authorization, undefined);

    const logoutResponse = await fetch(`${frontendUrl}/api/auth/logout`, {
      method: "POST",
      headers: { cookie: browserCookie },
    });
    assert.equal(logoutResponse.status, 200);
    assert.deepEqual(await logoutResponse.json(), { success: true });
    assert.ok(logoutResponse.headers.getSetCookie().some((cookie) => /Max-Age=0/i.test(cookie)));
    assert.equal(upstreamRequests.at(-1).cookie, browserCookie);

    const rejectedResponse = await fetch(`${frontendUrl}/api/events/my`, {
      headers: { cookie: browserCookie },
    });
    assert.equal(rejectedResponse.status, 401);
  } finally {
    nextProcess.kill();
    if (nextProcess.exitCode === null) await once(nextProcess, "exit");
  }
});
