import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.API_URL;

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'POST');
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'PATCH');
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'DELETE');
}

async function proxy(request: NextRequest, paramsPromise: Promise<{ path?: string[] }>, method: string) {
  if (!API_BASE_URL) {
    return NextResponse.json({ message: 'API URL not configured' }, { status: 500 });
  }

  const { path = [] } = await paramsPromise;
  const targetPath = path.join('/');
  const targetUrl = new URL(`${API_BASE_URL.replace(/\/$/, '')}/${targetPath}`);
  const requestUrl = new URL(request.url);
  if (requestUrl.search) {
    targetUrl.search = requestUrl.search;
  }

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('cookie');

  const body = method === 'GET' || method === 'DELETE' ? undefined : await request.text();

  const upstream = await fetch(targetUrl, {
    method,
    headers,
    body,
  });

  const responseBody = await upstream.text();
  const responseHeaders = new Headers();

  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'set-cookie') {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(responseBody, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
