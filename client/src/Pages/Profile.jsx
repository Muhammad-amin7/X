import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import ProfileDetails from '../Components/Profile/ProfileDetails'

export default function Profile() {
      return (
            <div className='border-r-1 border-[rgba(180,180,180,0.5)] flex'>
                  <div className='w-[600px]'>
                        <ProfileDetails />
                  </div>
            </div>
      )
}
