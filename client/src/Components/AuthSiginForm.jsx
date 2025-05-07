import { FaXmark } from "react-icons/fa6";
import React from 'react'
import Input from "../layouts/Input";
import Button from "../layouts/Button";

export default function AuthSiginForm({ close }) {
      return (
            <div className="h-full">
                  <div className='text-white text-2xl'><button onClick={() => close(null)}><FaXmark /></button></div>

                  <form action="" className="w-7/10 m-auto h-full relative">
                        <h1 className="text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">Create your account</h1>
                        <div className="mt-10">
                              <Input placeholder={'name'} name={'name'} min={2} className='my-7!' />
                              <Input placeholder={'email'} name={'email'} type="email" className='my-7!' />
                        </div>
                        <h3 className="text-white font-medium text-sm mb-3 mt-10">Date of birth</h3>
                        <p className="text-gray-700 text-sm">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        <div className="grid grid-cols-[2fr_1fr_1fr] gap-2">
                              <Input placeholder={'month'} name={'month'} max={12} type="number" />
                              <Input placeholder={'day'} name={'day'} max={31} type="number" />
                              <Input placeholder={'year'} name={'year'} min={1900} type="number" />
                        </div>
                        <Button className={'absolute bottom-17 left-1/2 -translate-x-1/2'}>Next</Button >
                  </form>
            </div>
      )
}
