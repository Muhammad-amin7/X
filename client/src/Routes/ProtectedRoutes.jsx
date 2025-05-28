import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../layouts/NavBar'

export default function ProtectedRoutes() {
      const isLogined = localStorage.getItem("token")
      return isLogined ? (
            <div className="grid grid-cols-[270px_600px_400px] justify-center">
                  <div className="block">
                        <NavBar></NavBar>
                  </div>
                  <Outlet />
                  <div className="block">
                        <div className='h-[100dvh] border-x-1 border-[rgb(47,51,54)] sticky top-0'></div>
                  </div>
            </div>
      ) : <Navigate to="/" replace />
}
