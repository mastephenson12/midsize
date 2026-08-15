import { rewrite } from '@vercel/functions';

export const config = {
  matcher: ['/', '/robots.txt', '/sitemap.xml', '/missed-lead-calculator', '/missed-lead-calculator/'],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const isRoofingDomain = url.hostname === 'roofers.midsizeai.com';

  if (isRoofingDomain && url.pathname === '/') {
    return rewrite(new URL('/roofers.html', request.url));
  }

  if (isRoofingDomain && url.pathname === '/robots.txt') {
    return rewrite(new URL('/roofers-robots.txt', request.url));
  }

  if (isRoofingDomain && url.pathname === '/sitemap.xml') {
    return rewrite(new URL('/roofers-sitemap.xml', request.url));
  }

  if (url.pathname.replace(/\/$/, '') === '/missed-lead-calculator') {
    return rewrite(new URL('/index.html', request.url));
  }
}
