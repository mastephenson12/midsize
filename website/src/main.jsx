import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isSamanthaDemoPath ? <SamanthaDemo /> : isAuditPath ? <MissedLeadAudit /> : isCalculatorPath ? <MissedLeadCalculator /> : isRoofingDomain && isRooferServicePath ? <RooferServiceFunnel /> : isRoofingDomain ? <RoofingApp /> : <App />}
  </StrictMode>,
)
