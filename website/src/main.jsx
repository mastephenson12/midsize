import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RoofingApp from './RoofingApp.jsx'
import MissedLeadCalculator from './MissedLeadCalculator.jsx'
import SamanthaDemo from './SamanthaDemo.jsx'

const normalizedPath = window.location.pathname.replace(/\/$/, '')
const isCalculatorPath = normalizedPath === '/missed-lead-calculator'
const isSamanthaDemoPath = normalizedPath === '/samantha-demo' || normalizedPath === '/samantha.html'

const isRoofingDomain =
  window.location.hostname === 'roofer.midsizeai.com' ||
  window.location.hostname === 'roofers.midsizeai.com' ||
  new URLSearchParams(window.location.search).get('site') === 'roofers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isSamanthaDemoPath ? <SamanthaDemo /> : isCalculatorPath ? <MissedLeadCalculator /> : isRoofingDomain ? <RoofingApp /> : <App />}
  </StrictMode>,
)