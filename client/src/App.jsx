import React from 'react'
import PagesRouter from './Routes/PagesRouter'
import ContextProvider from './Context/ContextProvider'

export default function App() {
  return (
    <>
      <ContextProvider>
        <PagesRouter />
      </ContextProvider>
    </>
  )
}
