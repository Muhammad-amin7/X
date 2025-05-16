import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../layouts/NavBar'

export default function ProtectedRoutes() {
      const isLogined = localStorage.getItem("token")
      return isLogined ? (
            <div className="grid grid-cols-[300px_600px_400px] justify-center">
                  <NavBar></NavBar>
                  <Outlet />
                  <div className='h-[100dvh] border-x-1 border-[rgb(47,51,54)]'></div>
            </div>
      ) : <Navigate to="/" replace />
}
