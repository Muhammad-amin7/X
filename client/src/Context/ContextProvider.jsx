import React from 'react'
import { Context } from './Context'

export default function ContextProvider({ children }) {
      return (
            <Context.Provider value={{}}>
                  {children}
            </Context.Provider>
      )
}
