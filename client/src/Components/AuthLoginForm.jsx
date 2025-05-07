import React from 'react'
import Button from '../layouts/Button'
import { FaXmark } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import Input from '../layouts/Input'

export default function AuthLoginForm({ close }) {
      return (
            <div className="h-full">
                  <div className='text-white text-2xl'><button onClick={() => close(null)}><FaXmark /></button></div>

                  <div className="w-7/10 m-auto h-full">
                        <h1 className="text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">Sign in to X</h1>
                        <div className="mt-10">
                              <Button>
                                    <span>Sign up with google</span>
                                    <FcGoogle />
                              </Button>
                              <Button>
                                    <span>Sign up with GitHub</span>
                                    <BsGithub />
                              </Button>
                        </div>
                        <div className="flex items-center justify-center gap-2 m-4">
                              <div className={lineStyle}></div>
                              <p className="uppercase color-[#e9e7ea] ">or</p>
                              <div className={lineStyle}></div>
                        </div>

                        <div className="my-10">
                              <Input placeholder={'phone , email , or username'} name={'email'} />
                        </div>

                        <Button>Next</Button >
                        <Button className={'bg-black! text-white border-white hover:bg-[rgba(255,255,255,0.1)]!'}>Forgot password?</Button >

                        <p>Don't have your account? <span onClick={() => close('sigin')}>Sign up</span></p>
                  </div>
            </div>
      )
}
const lineStyle = "w-full h-[1px] bg-[#2f3336] mt-[3px]"