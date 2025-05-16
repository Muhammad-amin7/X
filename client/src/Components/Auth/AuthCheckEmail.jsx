// We sent you a code
// Enter it below to verify abduhalilovshohruh680@gmail.com.

import React, { useContext, useEffect, useState } from 'react'
import Input from '../../layouts/Input'
import { useCheckCode } from '../../Hooks/useCheckCode'
import { Context } from '../../Context/Context'

export default function AuthCheckEmail() {
      const { setOpenThisModal } = useContext(Context)
      const [value, setValue] = useState(null)
      const [email] = useState(localStorage.getItem('email'))
      const { sendCode, data, loading } = useCheckCode()
      const [errorPassword, setErrorPassword] = useState(false)

      useEffect(() => {
            if (value?.length === 6) {
                  if (!email) return setOpenThisModal('sigin')
                  sendCode(value, email);
            }
      }, [value]);


      useEffect(() => {
            if (data?.ok) {
                  setOpenThisModal('setPassword')
            }

            if (data?.status === 401) {
                  setErrorPassword(true)
                  setTimeout(() => {
                        setErrorPassword(false)
                  }, 3000)
            }
      }, [data])



      return (
            <div>
                  <form className='w-9/10 lg:w-7/10 m-auto h-full relative' >
                        <h1 className="text-xl sm:text-3xl text-white my-2 sm:my-3 lg:my-4 font-extrabold font-[Tagesschrift,system-ui]">We sent you a code</h1>
                        <p className='text-xs sm:text-md lg:text-lg text-white mb-3'>Enter it below to verify <span className='text-blue-500'>{email}</span></p>
                        <Input placeholder={'Verification code'} max={999999} type='number' getValue={setValue} />
                        {loading && <p className='text-xs text-blue-500 mt-4'>Being checked...</p>}
                        {errorPassword && <p className='text-xs text-red-500 mt-4'>Password is wrong. Pleace try again.</p>}
                        <p className='text-[8px] sm:text-xs lg:text-sm text-blue-400'>Didn't receive email?</p>
                  </form>
            </div>
      )
}
