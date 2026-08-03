import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppLayout } from './components/layout/AppLayout'
import './app/styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app/routes/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  </React.StrictMode>,
)