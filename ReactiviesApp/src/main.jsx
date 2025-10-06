// Suppress all React development warnings from Semantic UI
const originalError = console.error;

console.warn = () => {}; // Suppress all warnings
console.error = (...args) => {
  // Only allow actual errors, not warnings
  const message = args[0];
  if (typeof message === 'string' && !message.includes('Warning')) {
    originalError.apply(console, args);
  }
};

import React from 'react'
import { createRoot } from 'react-dom/client'
import { StoreContext, store } from './stores/store.ts'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.tsx'

createRoot(document.getElementById('root')).render(
    <StoreContext.Provider value={store}>
      <RouterProvider router={router} />
    </StoreContext.Provider>
)
