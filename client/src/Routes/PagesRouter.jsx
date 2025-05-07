import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Auth from '../Pages/Auth'
import SaveToken from '../utils/saveToken'

export default function PagesRouter() {
      return (
            <>
                  <Routes>
                        <Route path='/' element={<Auth />} />
                        <Route path='/token' element={<SaveToken />} />
                  </Routes>
            </>
      )
}
