import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "../auth/cookie";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const API_BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const LOGIN_PRIVATE_FIELDS = new Set([
  "id",
  "role",
  "token",
  "accesstoken",
  "access_token",
]);

function forwardSetCookies(upstream: Response, response: NextResponse) {
  for (const cookie of upstream.headers.getSetCookie()) {
    response.headers.append("set-cookie", cookie);
  }
}

function sanitizeLoginPayload(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sanitizeLoginPayload);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([key, nestedValue]) =>
      LOGIN_PRIVATE_FIELDS.has(key.toLowerCase())
        ? []
        : [[key, sanitizeLoginPayload(nestedValue)]],
    ),
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "POST");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "PATCH");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "DELETE");
}

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "OPTIONS");
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  return proxy(request, params, "HEAD");
}

async function proxy(
  request: NextRequest,
  paramsPromise: Promise<{ path?: string[] }>,
  method: string,
) {
  if (!API_BASE_URL) {
    return NextResponse.json(
      { message: "API URL not configured" },
      { status: 500 },
    );
  }

  try {
    const { path = [] } = await paramsPromise;
    const normalizedPath = path.filter(Boolean).join("/");
    const isLoginRequest = normalizedPath === "users/login";
    const baseUrl = API_BASE_URL.replace(/\/$/, "");
    const targetUrl = new URL(
      normalizedPath ? `${baseUrl}/${normalizedPath}` : baseUrl,
    );
    const requestUrl = new URL(request.url);

    if (requestUrl.search) {
      targetUrl.search = requestUrl.search;
    }

    const headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("cookie");
    headers.delete("authorization");

    const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (sessionToken && !isLoginRequest) {
      headers.set("cookie", `${AUTH_COOKIE_NAME}=${sessionToken}`);
    }

    const hasBody = !["GET", "HEAD", "DELETE"].includes(method);
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const upstream = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const responseHeaders = new Headers();
    upstream.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey !== "set-cookie" &&
        lowerKey !== "content-length" &&
        lowerKey !== "content-encoding" &&
        lowerKey !== "transfer-encoding"
      ) {
        responseHeaders.set(key, value);
      }
    });

    if (isLoginRequest && upstream.ok) {
      const loginPayload: unknown = await upstream.clone().json().catch(() => null);
      if (!loginPayload || typeof loginPayload !== "object" || Array.isArray(loginPayload)) {
        return NextResponse.json(
          { message: "Resposta de login inválida" },
          { status: 502 },
        );
      }

      const response = NextResponse.json(sanitizeLoginPayload(loginPayload), {
        status: upstream.status,
        headers: responseHeaders,
      });
      forwardSetCookies(upstream, response);
      return response;
    }

    const responseBody = await upstream.arrayBuffer();

    const response = new NextResponse(responseBody, {
      status: upstream.status,
      headers: responseHeaders,
    });
    forwardSetCookies(upstream, response);
    return response;
  } catch {
    return NextResponse.json(
      { message: "Failed to proxy request to upstream API" },
      { status: 502 },
    );
  }
}
