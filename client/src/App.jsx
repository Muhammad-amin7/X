import React, { useEffect } from 'react'
import PagesRouter from './Routes/PagesRouter'
import ContextProvider from './Context/ContextProvider'
import { fetchUser } from './Services/user/user.services'
import { useDispatch } from 'react-redux'

export default function App() {
  // get user infos
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUser())
  }, [])

  return (
    <>
      <ContextProvider>
        <PagesRouter />
      </ContextProvider>
    </>
  )
}
