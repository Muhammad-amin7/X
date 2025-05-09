import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import Button from '../layouts/Button'

export default function ProfileDetails() {
      return (
            <div>
                  <section className='min-h-screen w-[1000px] border-r-1 border-[rgba(180,180,180,0.5)]'>
                        <nav className='px-10 py-5 flex gap-10 items-center border-b-1 border-[rgba(180,180,180,0.5)]'>
                              <button className='text-white text-2xl w-15 h-15 lg:hover:bg-[#71767b50] rounded-[50%] flex items-center justify-center'>
                                    <FaArrowLeft />
                              </button>

                              <div>
                                    <h1 className='text-white text-2xl font-semibold block'>Shohruh Abduxalilov</h1>
                                    <p className='text-[#71767b] text-md font-medium'>0 posts</p>
                              </div>
                        </nav>

                        <div className='w-full h-50 relative'>
                              <div className='bg-[#313336] w-full h-full'></div>
                              <div className='w-40 aspect-square bg-blue-700 rounded-[50%] absolute -bottom-1/3 left-[70px] flex items-center justify-center text-5xl text-white border-5 border-black'>S</div>
                        </div>

                        <Button className={'w-max! ml-auto mr-[30px] bg-black! text-white px-20! rounded-4xl'}>Edit profile</Button>
                  </section>
            </div>
      )
}
