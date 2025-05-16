import { TbCameraPlus } from "react-icons/tb";
import { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import Button from '../../layouts/Button'
import Input from "../../layouts/Input";

export default function ProfileEditModal({ info, close }) {
      const [BackImage, setBackImage] = useState()
      const [ProfilImage, setProfileImage] = useState()
      const onBackImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                  setBackImage(URL.createObjectURL(event.target.files[0]));
            }
      }
      const onProfilImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                  setProfileImage(URL.createObjectURL(event.target.files[0]));
            }
      }
      return (
            <div className='fixed w-full h-full z-1 bg-[rgba(250,250,250,0.1)] top-0 left-0 flex items-center justify-center'>

                  <div className='w-150 h-9/10 bg-black px-5 py-2 rounded-sm relative overflow-x-hidden block'>

                        <nav className='text-white flex justify-between items-center sticky -top-1 left-0 w-full bg-transparent backdrop-blur-[2px] z-20'>

                              <div className='flex gap-3 items-center'>

                                    <button onClick={() => close(false)} className='w-10 text-xl aspect-square rounded-full flex items-center justify-center hover:bg-[rgba(30,30,30,0.9)]'>
                                          <FaXmark />
                                    </button>

                                    <h2 className='text-xl font-bold'>Edit profile</h2>

                              </div>

                              <Button className={"max-w-1/5 py-1!"}>Save</Button>
                        </nav>

                        <div className='relative w-full h-50 text-white border-0'>
                              {/* profil background image */}
                              <div>

                                    <img src={BackImage} alt="" className='h-50 w-full object-cover' />

                                    <input type="file" onChange={onBackImageChange} className='hidden' id='getBackImage' />

                                    <label htmlFor="getBackImage" className='absolute top-1/2 left-1/2 -translate-1/2 z-10 w-10 h-10 bg-[rgba(0,0,0,0.3)] backdrop-blur-[10px] flex items-center justify-center rounded-full'>
                                          <TbCameraPlus />
                                    </label>

                              </div>
                              {/* main profil image */}
                              <div className="w-35 h-35 bg-black absolute -bottom-1/3 left-6 x-20 rounded-full border-5 border-white">

                                    <img src={ProfilImage} alt="" className='h-full w-full object-cover rounded-full' />

                                    <label htmlFor="getImage" className='absolute top-1/2 left-1/2 -translate-1/2 z-10 w-10 h-10 bg-[rgba(0,0,0,0.3)] backdrop-blur-[10px] flex items-center justify-center rounded-full'>
                                          <TbCameraPlus />
                                    </label>

                                    <input type="file" onChange={onProfilImageChange} className='hidden' id='getImage' />

                              </div>
                        </div>

                        <div className="mt-25">
                              <Input placeholder={'Name'} type="text" name={"name"} defaultValue={info?.name} />
                              <Input placeholder={'bio'} className={"h-30!"} type="text" textarea={true} name={'bio'} />
                              <Input placeholder={'Location'} type="text" name={"Location"} />
                        </div>

                  </div>

            </div>
      )
}
