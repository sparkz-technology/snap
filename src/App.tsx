import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import { Home } from './_root/pages'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="flex h-screen">{children}</main>
}

const routes = createBrowserRouter([
  // public
  {
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SigninForm /> },
      { path: '/sign-up', element: <SignupForm /> },
    ],
  },
  // private
  {
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
])

const App: React.FC = () => {
  return (
    <Main>
      <RouterProvider router={routes} />
    </Main>
  )
}

export default App
