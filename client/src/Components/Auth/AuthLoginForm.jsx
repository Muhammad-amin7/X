import React, { useContext, useEffect, useState } from 'react'
import Button from '../../layouts/Button'
import { FaXmark } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { BsGithub } from 'react-icons/bs'
import Input from '../../layouts/Input'
import { Context } from '../../Context/Context'
import { useLoginEmail } from '../../Hooks/useLoginEmail'
import { handleSendInfoes } from '../../utils/handleSendInfo'
import { useResetPassword } from '../../Hooks/useResetPassword'

export default function AuthLoginForm() {
      const { setOpenThisModal } = useContext(Context)
      const { sendEmail, data } = useLoginEmail()
      const [inputValue, setInputValue] = useState(null)
      const [errorEmail, setErrorEmail] = useState(false)
      const [buttonDisable, setButtonDisable] = useState(true)
      const { sendEmail: sendEmailForReset, data: resetData, } = useResetPassword()

      const handleLoginGoogle = async () => {
            window.location.href = 'http://localhost:3000/user/auth/google';
      };
      const handleLoginGithub = async () => {
            window.location.href = 'http://localhost:3000/user/auth/github';
      };
      useEffect(() => {
            if (inputValue?.includes("@") && inputValue?.includes(".com")) {
                  setButtonDisable(false)
            } else {
                  setButtonDisable(true)
            }
      }, [inputValue])

      useEffect(() => {
            if (data?.ok) {
                  setOpenThisModal('loginPassword')
                  localStorage.setItem('login_email', data?.email)
            }
            else if (data?.status === 409) {
                  setErrorEmail(true)
                  setTimeout(() => { setErrorEmail(false) }, 3000)
            }
      }, [data])

      useEffect(() => {
            if (resetData?.ok) {
                  setOpenThisModal("forgotPassword");
            }
      }, [resetData])

      return (
            <div className="h-full">
                  <div className='text-white text-2xl'><button onClick={() => setOpenThisModal(null)}><FaXmark /></button></div>

                  <form className="w-4/5 lh:w-7/10 m-auto h-full" onSubmit={(e) => handleSendInfoes(e, sendEmail)}>
                        <h1 className="text-2xl sm:text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">Sign in to X</h1>
                        <div className="mt-10">
                              <Button onclickEvent={handleLoginGoogle}>
                                    <span>Sign up with google</span>
                                    <FcGoogle />
                              </Button>
                              <Button onclickEvent={handleLoginGithub}>
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
                              <Input placeholder={'email'} name={'email'} getValue={setInputValue} />
                              {errorEmail && <p className='text-xs font-bold text-red-800'>This email is not defined</p>}
                        </div>

                        <Button submit={true} disabled={buttonDisable}>Next</Button>
                        <Button type="button" onclickEvent={() => { sendEmailForReset(inputValue); localStorage.setItem("login_email", inputValue) }} disabled={buttonDisable} className={'bg-black! text-white border-white hover:bg-[rgba(255,255,255,0.1)]!'}>Forgot password?</Button >

                        <p>Don't have your account? <span onClick={() => setOpenThisModal('sigin')} className='text-blue-500 cursor-pointer hover:underline'>Sign up</span></p>
                  </form>
            </div>
      )
}
const lineStyle = "w-full h-[1px] bg-[#2f3336] mt-[3px]"