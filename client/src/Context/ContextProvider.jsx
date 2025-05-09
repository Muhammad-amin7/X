import React, { useState } from 'react'
import { Context } from './Context'

export default function ContextProvider({ children }) {
      const [openThisModal, setOpenThisModal] = useState(null)
      return (
            <Context.Provider value={{ openThisModal, setOpenThisModal }}>
                  {children}
            </Context.Provider>
      )
}
