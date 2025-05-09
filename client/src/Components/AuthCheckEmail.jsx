// We sent you a code
// Enter it below to verify abduhalilovshohruh680@gmail.com.

import React, { useContext, useEffect, useState } from 'react'
import Input from '../layouts/Input'
import { handleSendInfoes } from '../utils/handleSendInfo'
import { useCheckCode } from '../Hooks/useCheckCode'
import AuthSetPassword from './AuthSetPassword'
import { Context } from '../Context/Context'

export default function AuthCheckEmail() {
      const { setOpenThisModal } = useContext(Context)
      const [value, setValue] = useState(null)
      const [email, setEmail] = useState(localStorage.getItem('email'))
      const { sendCode, data, loading, error } = useCheckCode()

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
      }, [data])



      return (
            <div>
                  <form className='w-7/10 m-auto h-full relative' >
                        <h1 className="text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">We sent you a code</h1>
                        <p className='text-lg text-white mb-3'>Enter it below to verify <span className='text-blue-500'>{email}</span></p>
                        <Input placeholder={'Verification code'} max={999999} type='number' getValue={setValue} />
                        <p className='text-sm text-blue-400'>Didn't receive email?</p>
                  </form>
                  {loading && <p className='text-xs text-red-500 mt-4'>Being checked...</p>}
                  {data?.status === 401 && <p className='text-xs text-red-500 mt-4'>Password is wrong. Pleace try again.</p>}
            </div>
      )
}
