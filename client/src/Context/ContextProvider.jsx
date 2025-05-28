import React, { useEffect, useState } from 'react'
import { Context } from './Context'
import { useUsersProfile } from '../Hooks/useUsersProfile'

export default function ContextProvider({ children }) {
      const [openThisModal, setOpenThisModal] = useState(null)
      const [UserInfos, setUserInfos] = useState({})
      const [Contents, setContents] = useState([])

      const { data, sendId } = useUsersProfile()
      useEffect(() => {
            sendId()
      }, [])

      useEffect(() => {
            if (data) {
                  setUserInfos(data?.info)
            }
      }, [data])


      return (
            <Context.Provider value={{ openThisModal, setOpenThisModal, UserInfos, setUserInfos, Contents, setContents }}>
                  {children}
            </Context.Provider>
      )
}
