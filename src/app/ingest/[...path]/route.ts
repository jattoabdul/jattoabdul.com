export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

const DEFAULT_POSTHOG_HOST = 'https://us.i.posthog.com';
const REQUEST_HEADERS_TO_FORWARD = [
  'accept',
  'content-encoding',
  'content-type',
  'origin',
  'referer',
  'user-agent',
];
const RESPONSE_HEADERS_TO_REMOVE = [
  'connection',
  'content-encoding',
  'content-length',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
];

function getPostHogHost() {
  return (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? DEFAULT_POSTHOG_HOST).replace(/\/$/, '');
}

function getPostHogAssetsHost(postHogHost: string) {
  if (postHogHost.includes('eu.i.posthog.com')) {
    return 'https://eu-assets.i.posthog.com';
  }

  if (postHogHost.includes('us.i.posthog.com')) {
    return 'https://us-assets.i.posthog.com';
  }

  return postHogHost;
}

function getPostHogRequestHeaders(headers: Headers) {
  const nextHeaders = new Headers();

  for (const header of REQUEST_HEADERS_TO_FORWARD) {
    const value = headers.get(header);
    if (value) {
      nextHeaders.set(header, value);
    }
  }

  return nextHeaders;
}

function cleanResponseHeaders(headers: Headers) {
  const nextHeaders = new Headers(headers);

  for (const header of RESPONSE_HEADERS_TO_REMOVE) {
    nextHeaders.delete(header);
  }

  return nextHeaders;
}

async function getPathSegments(context: RouteContext) {
  const params = await context.params;
  return params.path ?? [];
}

async function proxyPostHog(request: Request, context: RouteContext) {
  const pathSegments = await getPathSegments(context);
  const path = pathSegments.join('/');
  const incomingUrl = new URL(request.url);
  const postHogHost = getPostHogHost();
  const assetsHost = getPostHogAssetsHost(postHogHost);
  const upstreamHost =
    pathSegments[0] === 'static' || pathSegments[0] === 'array' ? assetsHost : postHogHost;
  const upstreamUrl = new URL(`/${path}${incomingUrl.search}`, upstreamHost);
  const body =
    request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer();

  const response = await fetch(upstreamUrl, {
    method: request.method,
    headers: getPostHogRequestHeaders(request.headers),
    body,
    cache: 'no-store',
    redirect: 'manual',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: cleanResponseHeaders(response.headers),
  });
}

export const GET = proxyPostHog;
export const POST = proxyPostHog;
export const PUT = proxyPostHog;
export const PATCH = proxyPostHog;
export const DELETE = proxyPostHog;
export const HEAD = proxyPostHog;
export const OPTIONS = proxyPostHog;
