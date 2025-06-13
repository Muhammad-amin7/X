import { Navigate, Outlet } from 'react-router-dom'
import NavBar from '../layouts/NavBar'

export default function ProtectedRoutes() {
      const isLogined = localStorage.getItem("token")
      return isLogined ? (
            <div className="sm:grid grid-cols-[9fr_20fr_13fr] max-w-full sm:max-w-[1400px] m-auto justify-center h-[100dvh] ">
                  <div className="hidden sm:block">
                        <NavBar></NavBar>
                  </div>
                  <Outlet className="overflow-y-scroll"/>
                  <div className="hidden sm:block">
                        <div className='h-[100dvh] border-x-1 border-[rgb(47,51,54)] sticky top-0'></div>
                  </div>
            </div>
      ) : <Navigate to="/" replace />
}
