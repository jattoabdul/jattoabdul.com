export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type RouteContext = {
  params: Promise<{ path?: string[] }>;
};

const DEFAULT_POSTHOG_HOST = 'https://us.i.posthog.com';
const REQUEST_HEADERS_TO_REMOVE = [
  'connection',
  'content-length',
  'host',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
];
const RESPONSE_HEADERS_TO_REMOVE = [...REQUEST_HEADERS_TO_REMOVE, 'content-encoding'];

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

function cleanHeaders(headers: Headers, headersToRemove: string[]) {
  const nextHeaders = new Headers(headers);

  for (const header of headersToRemove) {
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
    headers: cleanHeaders(request.headers, REQUEST_HEADERS_TO_REMOVE),
    body,
    cache: 'no-store',
    redirect: 'manual',
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: cleanHeaders(response.headers, RESPONSE_HEADERS_TO_REMOVE),
  });
}

export const GET = proxyPostHog;
export const POST = proxyPostHog;
export const PUT = proxyPostHog;
export const PATCH = proxyPostHog;
export const DELETE = proxyPostHog;
export const HEAD = proxyPostHog;
export const OPTIONS = proxyPostHog;
