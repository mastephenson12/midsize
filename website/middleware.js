import { rewrite } from '@vercel/functions';

export const config = {
  matcher: [
    '/',
    '/robots.txt',
    '/sitemap.xml',
    '/honest-roofer',
    '/honest-roofer/',
    '/estimate-decoder',
    '/estimate-decoder/',
    '/missed-lead-calculator',
    '/missed-lead-calculator/',
  ],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const isRoofingDomain = url.hostname === 'roofers.midsizeai.com';
  const isHomeownerDomain = url.hostname === 'homeowner.midsizeai.com';
  const isBusinessDomain = url.hostname === 'www.midsizeai.com' || url.hostname === 'midsizeai.com';

  if (isHomeownerDomain && url.pathname.replace(/\/$/, '') === '/honest-roofer') {
    return Response.redirect(new URL('/', request.url), 308);
  }

  if (isBusinessDomain && url.pathname.replace(/\/$/, '') === '/honest-roofer') {
    return Response.redirect('https://homeowner.midsizeai.com/', 308);
  }

  if (isBusinessDomain && url.pathname.replace(/\/$/, '') === '/estimate-decoder') {
    return Response.redirect('https://homeowner.midsizeai.com/estimate-decoder/', 308);
  }

  if (isHomeownerDomain && url.pathname === '/') {
    return rewrite(new URL('/honest-roofer/', request.url));
  }

  if (isHomeownerDomain && url.pathname === '/robots.txt') {
    return rewrite(new URL('/homeowner-robots.txt', request.url));
  }

  if (isHomeownerDomain && url.pathname === '/sitemap.xml') {
    return rewrite(new URL('/homeowner-sitemap.xml', request.url));
  }

  if (isRoofingDomain && url.pathname === '/') {
    return rewrite(new URL('/roofers', request.url));
  }

  if (isRoofingDomain && url.pathname === '/robots.txt') {
    return rewrite(new URL('/roofers-robots.txt', request.url));
  }

  if (isRoofingDomain && url.pathname === '/sitemap.xml') {
    return rewrite(new URL('/roofers-sitemap.xml', request.url));
  }

  if (url.pathname.replace(/\/$/, '') === '/missed-lead-calculator') {
    return rewrite(new URL('/calculator', request.url));
  }
}
