import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  const isAuthenticated = false
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className='flex flex-1 items-center justify-center flex-col 
          py-10'>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout
