import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const API_BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'POST');
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'PATCH');
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'PUT');
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'DELETE');
}

export async function OPTIONS(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'OPTIONS');
}

export async function HEAD(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, params, 'HEAD');
}

async function proxy(request: NextRequest, paramsPromise: Promise<{ path?: string[] }>, method: string) {
  if (!API_BASE_URL) {
    return NextResponse.json({ message: 'API URL not configured' }, { status: 500 });
  }

  try {
    const { path = [] } = await paramsPromise;
    const normalizedPath = path.filter(Boolean).join('/');
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const targetUrl = new URL(normalizedPath ? `${baseUrl}/${normalizedPath}` : baseUrl);
    const requestUrl = new URL(request.url);

    if (requestUrl.search) {
      targetUrl.search = requestUrl.search;
    }

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('cookie');

    const hasBody = !['GET', 'HEAD', 'DELETE'].includes(method);
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const upstream = await fetch(targetUrl, {
      method,
      headers,
      body,
    });

    const responseBody = await upstream.arrayBuffer();
    const responseHeaders = new Headers();

    upstream.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (lowerKey !== 'set-cookie' && lowerKey !== 'content-length') {
        responseHeaders.set(key, value);
      }
    });

    return new NextResponse(responseBody, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { message: 'Failed to proxy request to upstream API' },
      { status: 502 },
    );
  }
}
