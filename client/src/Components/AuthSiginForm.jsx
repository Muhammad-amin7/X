import { FaXmark } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from 'react'
import Input from "../layouts/Input";
import Button from "../layouts/Button";
import { useSendSiginEmail } from "../Hooks/useSendSiginEmail";
import { handleSendInfoes } from "../utils/handleSendInfo";
import { Context } from "../Context/Context";
import { useCheckExistedEmail } from "../Hooks/useExistedEmail";

export default function AuthSiginForm() {
      const { setOpenThisModal } = useContext(Context)
      const [buttonActive, setButtonActive] = useState(false)
      const { sendEmail, data, loading, } = useSendSiginEmail()
      const { sendEmail: exSendEmail, data: exData, } = useCheckExistedEmail()


      const handleCheckInfo = (e) => {
            const formData = new FormData(e.target.form);

            let isValid = true;
            for (let [_, value] of formData.entries()) {
                  if (!value.trim()) {
                        isValid = false;
                        break;
                  }
            }

            if (formData.get("email").includes("@")) {
                  exSendEmail(formData.get("email"))
            }

            setButtonActive(isValid);
      }

      useEffect(() => {
            if (data?.ok) {
                  setOpenThisModal("CheckEmail");
                  localStorage.setItem('email', data?.email)
            }
      }, [data])

      useEffect(() => {
            if (exData?.status == 409) {
                  setButtonActive(false);
            }
      }, [exData])

      return (
            <>

                  <div className="h-full">
                        <div className='text-white text-2xl'><button onClick={() => setOpenThisModal(null)}><FaXmark /></button></div>

                        <form onSubmit={e => { buttonActive && handleSendInfoes(e, sendEmail) }} onChange={handleCheckInfo} className="w-7/10 m-auto h-full relative" autoComplete="off">
                              <h1 className="text-3xl text-white my-4 font-extrabold font-[Tagesschrift,system-ui]">Create your account</h1>
                              <div className="mt-10">
                                    <Input placeholder={'name'} name={'name'} min={2} className='my-7!' />
                                    <Input placeholder={'email'} name={'email'} type="email" className='mt-7!' />
                                    {exData?.status === 409 && <p className="text-md text-red-800 font-light">This email alredy used.</p>}
                              </div>
                              <h3 className="text-white font-medium text-sm mb-3 mt-10">Date of birth</h3>
                              <p className="text-gray-700 text-sm">This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                              <div className="grid grid-cols-[2fr_1fr_1fr] gap-2">
                                    <Input placeholder={'month'} name={'month'} max={12} type="number" />
                                    <Input placeholder={'day'} name={'day'} max={31} type="number" />
                                    <Input placeholder={'year'} name={'year'} min={1900} max={2009} type="number" />
                              </div>

                              <Button className={'absolute bottom-17 left-1/2 -translate-x-1/2'} submit={true} loading={loading} disabled={!buttonActive}>Next</Button >
                        </form >
                  </div >

            </>
      )
}
