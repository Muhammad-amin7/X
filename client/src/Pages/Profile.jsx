import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import ProfileDetails from '../Components/ProfileDetails'

export default function Profile() {
      return (
            <div className='w-full border-r-1 border-[rgba(180,180,180,0.5)] flex'>
                  <div>
                        <ProfileDetails />
                  </div>
            </div>
      )
}
