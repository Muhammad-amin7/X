import React, { useEffect, useState } from 'react'
import { Context } from './Context'
import { useUsersProfile } from '../Hooks/useUsersProfile'

export default function ContextProvider({ children }) {
      const [openThisModal, setOpenThisModal] = useState(null)
      const { data, sendId } = useUsersProfile()
      const [UserInfos, setUserInfos] = useState({})

      useEffect(() => {
            sendId()
      }, [])

      useEffect(() => {
            if (data) {
                  setUserInfos(data?.info)
            }
      }, [data])


      return (
            <Context.Provider value={{ openThisModal, setOpenThisModal, UserInfos, setUserInfos }}>
                  {children}
            </Context.Provider>
      )
}
