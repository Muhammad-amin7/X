import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../layouts/NavBar'

export default function ProtectedRoutes() {
      const isLogined = localStorage.getItem("token")
      return isLogined ? (
            <div className="flex w-4/5 m-auto">
                  <NavBar></NavBar>
                  <Outlet />
            </div>
      ) : <Navigate to="/" replace />
}
