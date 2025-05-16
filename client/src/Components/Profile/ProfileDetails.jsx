import React, { useContext } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import ProfileNames from './ProfileNames'
import ProfileImages from './ProfileImages'
import ProfileEditModal from './ProfileEditModal'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../Context/Context'

export default function ProfileDetails() {
      const { UserInfos } = useContext(Context)
      const navigate = useNavigate()



      return (
            <div>
                  <section className='min-h-screen border-r-1 border-[rgba(180,180,180,0.5)]'>
                        <nav className='px-4 flex gap-10 items-center border-b-1 border-[rgba(180,180,180,0.5)]'>
                              <button onClick={() => navigate("/home")} className='text-white text-xl w-10 h-10 lg:hover:bg-[#71767b50] rounded-[50%] flex items-center justify-center'>
                                    <FaArrowLeft />
                              </button>

                              <div>
                                    <h1 className='text-white text-xl font-semibold block'>{UserInfos?.info?.name}</h1>
                                    <p className='text-[#71767b] text-sm font-medium'>0 posts</p>
                              </div>
                        </nav>


                        <ProfileImages info={UserInfos.info} />
                        <ProfileNames info={UserInfos.info} />
                  </section>
            </div>
      )
}
