import React, { useState, useEffect } from 'react'
import Input from '../../layouts/Input'
import Button from '../../layouts/Button'
import { useCheckResetCode } from '../../Hooks/useCheckResetCode'
import { useChangePassword } from '../../Hooks/useChangePassword'

export default function AuthResetPassword() {
      const [email, setEmail] = useState(localStorage.getItem("login_email") || "")
      const [code, setCode] = useState("")
      const [password, setPassword] = useState("")
      const { sendResetCode, data, loading, error } = useCheckResetCode()
      const { sendPassword, data: pasData, loading: pasLoading, error: passError } = useChangePassword()
      const [showError, setShowError] = useState(false);


      useEffect(() => {
            if (code.length === 6) {
                  sendResetCode(email, code)
            }
      }, [code])

      useEffect(() => {
            if (pasData?.ok) {
                  localStorage.setItem("token", pasData.access_token)
            }
      }, [pasData])


      useEffect(() => {
            if (error || (data && !data.ok)) {
                  setShowError(true);
                  const timeout = setTimeout(() => {
                        setShowError(false);
                  }, 3000);
                  return () => clearTimeout(timeout);
            }
      }, [error, data]);

      const handleSubmit = (e) => {
            e.preventDefault()
            if (password.length >= 8) {
                  sendPassword(email, password)
            } else {
                  alert("Parol 8 ta belgidan uzun bo'lishi kerak")
            }
      }

      return (
            <div className='h-full'>
                  <form className='w-4/5 m-auto h-full relative' onSubmit={handleSubmit}>
                        <h1 className="text-xl sm:text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">
                              Change your password
                        </h1>
                        <p className='text-xs sm:text-lg text-white mb-3 mt-2 sm:mt-4 lg:mt-10'>
                              Enter it below to verify <span className='text-blue-500'>{email}</span>
                        </p>

                        <Input placeholder='Code' type='number' name="code" min={100000} max={999999} getValue={setCode} />

                        {loading && <p className='text-yellow-400'>Verifying the code...</p>}
                        {showError && <p className='text-red-500'>Invalid code or an error occurred</p>}


                        {data?.ok && (
                              <div>
                                    <p className='text-xs sm:text-lg text-white mt-6'>Yangi parolni kiriting (kamida 8ta belgi):</p>
                                    <Input placeholder='New Password' type='password' name="password" getValue={setPassword} />
                              </div>
                        )}

                        <Button className="absolute left-1/2 -translate-x-1/2 bottom-0" submit={true}>
                              Confirm
                        </Button>
                  </form>
            </div>
      )
}
