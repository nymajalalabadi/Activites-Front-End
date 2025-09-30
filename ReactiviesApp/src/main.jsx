import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StoreContext, store } from './stores/store.ts'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import App from './app/layout/App.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>,
)
