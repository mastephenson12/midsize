import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RoofingApp from './RoofingApp.jsx'

const isRoofingDomain =
  window.location.hostname === 'roofers.midsizeai.com' ||
  new URLSearchParams(window.location.search).get('site') === 'roofers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isRoofingDomain ? <RoofingApp /> : <App />}
  </StrictMode>,
)