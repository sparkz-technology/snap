import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryProvider } from './lib/react-query/QueryProvider'
import AuthProvider from './context/AuthContext'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>,
)
