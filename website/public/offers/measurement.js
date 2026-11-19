(function () {
'use strict';
var page = document.body;
var offer = page.dataset.offer;
var audience = page.dataset.audience;
var offers = ['missed-calls','open-estimates','follow-up-pilot','understand-my-estimate','compare-roofing-quotes'];
if (!offers.includes(offer) || !['roofer','homeowner'].includes(audience)) return;
var params = new URLSearchParams(location.search);
var source = ['linkedin','google_business_profile'].includes(params.get('utm_source')) ? params.get('utm_source') : 'other';
var content = /^post_[0-9]{2}$/.test(params.get('utm_content') || '') ? params.get('utm_content') : 'unassigned';
var campaign = 'offer_' + offer.replaceAll('-', '_');
var privacy = navigator.globalPrivacyControl || navigator.doNotTrack === '1';
function send(name, extra) {
if (privacy || typeof window.gtag !== 'function') return;
window.gtag('event', name, Object.assign({
send_to:'G-GMPF16SQ8L', offer_id:offer, audience:audience,
campaign_source:source, campaign_name:campaign, post_id:content,
page_location:location.origin + location.pathname,
page_referrer:'', transport_type:'beacon'
}, extra || {}));
}
send('offer_view');
document.querySelectorAll('a[data-offer-cta]').forEach(function(link) {
var destination = new URL(link.href, location.href);
if (destination.protocol === 'https:' && destination.origin === location.origin) {
destination.searchParams.set('utm_source',source);
destination.searchParams.set('utm_medium','offer_page');
destination.searchParams.set('utm_campaign',campaign);
destination.searchParams.set('utm_content',content);
destination.searchParams.set('offer_id',offer);
link.href=destination.href;
} else if (destination.protocol === 'mailto:') {
// Add only controlled campaign labels. No visitor input or customer data.
destination.searchParams.set('body','Offer: '+offer+'\nSource: '+source+'\nPost: '+content+'\n\nCompany:\nService area:\nCurrent phone system:\nWhere callbacks get stuck:\n');
link.href=destination.href;
}
link.addEventListener('click',function(){send('offer_cta_click',{cta_position:link.dataset.offerCta});});
});
}());