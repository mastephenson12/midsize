import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RoofingApp from './RoofingApp.jsx'
import HomeownerApp from './HomeownerApp.jsx'
import MissedLeadCalculator from './MissedLeadCalculator.jsx'

const isCalculatorPath = window.location.pathname.replace(/\/$/, '') === '/missed-lead-calculator'

const isHomeownerDomain =
  window.location.hostname === 'homeowner.midsizeai.com' ||
  new URLSearchParams(window.location.search).get('site') === 'homeowner'

const isRoofingDomain =
  window.location.hostname === 'roofer.midsizeai.com' ||
  window.location.hostname === 'roofers.midsizeai.com' ||
  new URLSearchParams(window.location.search).get('site') === 'roofers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isCalculatorPath ? (
      <MissedLeadCalculator />
    ) : isHomeownerDomain ? (
      <HomeownerApp />
    ) : isRoofingDomain ? (
      <RoofingApp />
    ) : (
      <App />
    )}
  </StrictMode>,
)
