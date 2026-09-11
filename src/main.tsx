import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppLayout } from './components/layout/AppLayout'
import './app/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes/AppRoutes'
import { LiveFeedProvider } from './context /LiveFeedContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LiveFeedProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </LiveFeedProvider>
    </BrowserRouter>
  </React.StrictMode>,
)