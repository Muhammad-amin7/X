import React, { useEffect } from 'react'
import Input from '../layouts/Input'
import Button from '../layouts/Button'
import { useSiginUser } from '../Hooks/useSiginUser'
import { handleSendInfoes } from '../utils/handleSendInfo'

export default function AuthSetPassword() {
      const { sendPassword, data, loading, error } = useSiginUser()
      useEffect(() => {
            if (data?.ok) console.log(data)
      }, [data])


      return (
            <div className='h-full'>
                  <form className='w-7/10 m-auto h-full relative' onSubmit={e => handleSendInfoes(e, sendPassword)}>
                        <h1 className="text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">You'll need a password</h1>
                        <p className='text-lg text-white mb-3'>make sure it's 8 characters or more</p>
                        <Input placeholder={'password'} type='password' name={"password"} />
                        <Button className={"absolute left-1/2 -translate-x-1/2 bottom-0"} submit={true}>Sign Up</Button>
                  </form>
            </div>
      )
}
