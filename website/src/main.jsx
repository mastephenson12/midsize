import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import RoofingApp from './RoofingApp.jsx'
import MissedLeadCalculator from './MissedLeadCalculator.jsx'
import MissedLeadAudit from './MissedLeadAudit.jsx'
import SamanthaDemo from './SamanthaDemo.jsx'
import RooferServiceFunnel from './RooferServiceFunnel.jsx'

const normalizedPath = window.location.pathname.replace(/\/$/, '')
const isCalculatorPath = ['/missed-lead-calculator', '/missed-call-calculator'].includes(normalizedPath)
const isAuditPath = normalizedPath === '/missed-lead-audit'
const isSamanthaDemoPath = normalizedPath === '/samantha-demo' || normalizedPath === '/samantha.html'
const isRooferServicePath = normalizedPath.startsWith('/services/')
const isRoofersPath = normalizedPath === '/roofers' || normalizedPath === '/roofers.html'

const isRoofingDomain =
  isRoofersPath ||
  window.location.hostname === 'roofer.midsizeai.com' ||
  window.location.hostname === 'roofers.midsizeai.com' ||
  new URLSearchParams(window.location.search).get('site') === 'roofers'

const root = document.getElementById('root')
const page = (
  <StrictMode>
    {isSamanthaDemoPath ? <SamanthaDemo /> : isAuditPath ? <MissedLeadAudit /> : isCalculatorPath ? <MissedLeadCalculator /> : isRoofingDomain && isRooferServicePath ? <RooferServiceFunnel /> : isRoofingDomain ? <RoofingApp /> : <App />}
  </StrictMode>,
)

// Rewrites also serve these HTML files for tools and service funnels. Hydrate only
// when the requested component matches the build-time page; otherwise mount it.
const isHomePage = !isSamanthaDemoPath && !isAuditPath && !isCalculatorPath && !isRoofingDomain
const isRoofersPage = !isSamanthaDemoPath && !isAuditPath && !isCalculatorPath && isRoofingDomain && !isRooferServicePath
if ((root.dataset.prerender === 'home' && isHomePage) ||
    (root.dataset.prerender === 'roofers' && isRoofersPage)) {
  hydrateRoot(root, page)
} else {
  createRoot(root).render(page)
}
