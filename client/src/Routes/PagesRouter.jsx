import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../Pages/Auth'
import SaveToken from '../utils/saveToken'
import Home from '../Pages/Home'
import ProtectedRoutes from './ProtectedRoutes'
import NavBar from '../layouts/NavBar'
import Profile from '../Pages/Profile'
import Bookmarks from '../Pages/Bookmarks'

export default function PagesRouter() {

      return (
            <>
                  <Routes>
                        <Route path='/' element={<Auth />} />
                        <Route path='/token' element={<SaveToken />} />
                        <Route element={<ProtectedRoutes />}>
                              <Route path='/home' element={<Home />} />
                              <Route path='/profile/:id' element={<Profile />} />
                              <Route path='/bookmarks' element={<Bookmarks />} />
                        </Route>
                  </Routes>
            </>
      )
}
