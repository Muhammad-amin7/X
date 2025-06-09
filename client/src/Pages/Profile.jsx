import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import ProfileDetails from '../Components/Profile/ProfileDetails'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../Services/user/user.services'

export default function Profile() {
      const { id } = useParams()
      const dispatch = useDispatch()
      useEffect(() => {
            console.log(id)
            dispatch(fetchUser(id))
      }, [id])

      return (
            <ProfileDetails id={id} />
      )
}
