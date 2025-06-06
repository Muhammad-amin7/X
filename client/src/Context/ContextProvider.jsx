import React, { useState } from 'react'
import { Context } from './Context'


export default function ContextProvider({ children }) {
      const [openThisModal, setOpenThisModal] = useState(null)
      const [UserInfos, setUserInfos] = useState({})
      const [Contents, setContents] = useState([])
      const [ContentLimit, setContentLimit] = useState(10)



      return (
            <Context.Provider value={{ openThisModal, setOpenThisModal, UserInfos, setUserInfos, Contents, setContents, ContentLimit, setContentLimit }}>
                  {children}
            </Context.Provider>
      )
}
