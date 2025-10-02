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
