import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  LikedPosts,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from './_root/pages'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'
import AuthProvider from './context/AuthContext'
import { QueryProvider } from './lib/react-query/QueryProvider'

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main className="flex h-screen">{children}</main>
}

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  )
}

const routes = createBrowserRouter([
  // public
  {
    element: (
      <Provider>
        <AuthLayout />
      </Provider>
    ),
    children: [
      { path: '/sign-in', element: <SigninForm /> },
      { path: '/sign-up', element: <SignupForm /> },
    ],
  },
  // private
  {
    element: (
      <Provider>
        <RootLayout />
      </Provider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: '/explore', element: <Explore /> },
      { path: '/saved', element: <Saved /> },
      { path: '/all-users', element: <AllUsers /> },
      { path: '/create-post', element: <CreatePost /> },
      { path: '/update-post/:id', element: <EditPost /> },
      { path: '/posts/:id', element: <PostDetails /> },
      { path: '/profile/:id', element: <Profile /> },
      { path: '/profile/:id/liked-posts', element: <LikedPosts /> },
      { path: '/update-profile/:id', element: <UpdateProfile /> },
    ],
  },
])

const App: React.FC = () => {
  return (
    <Main>
      <RouterProvider router={routes} />
      <Toaster />
    </Main>
  )
}

export default App
