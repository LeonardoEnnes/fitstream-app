import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './features/dashboard/dashboardPage'
import './app/styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppLayout>
      <Dashboard />
    </AppLayout>
  </React.StrictMode>,
)