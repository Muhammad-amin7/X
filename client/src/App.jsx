import React, { useEffect } from 'react'
import PagesRouter from './Routes/PagesRouter'
import ContextProvider from './Context/ContextProvider'
import { fetchUser } from './Services/user/user.services'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

export default function App() {
  // get user infos
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchUser())

    // check token
    const token = localStorage.getItem('token')
    navigate(token ? "/home" : "/")
  }, [])

  return (
    <>
      <ContextProvider>
        <PagesRouter />
      </ContextProvider>
    </>
  )
}
