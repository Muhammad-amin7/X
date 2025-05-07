import React, { useRef } from 'react'
import AuthLoginForm from './AuthLoginForm'
import AuthSiginForm from './AuthSiginForm'

export default function AuthFormModal({ active = 'sigin', close }) {
      const contentDiv = useRef()



      return (
            <div className={`${active ? "flex" : 'hidden'} fixed top-0 left-0 w-screen h-screen bg-[#5b708366] z-10 text-white items-center justify-center`}
                  onClick={(e) => e.currentTarget == e.target && close(null)}>

                  <div className='w-[700px] h-[750px] bg-black rounded-2xl p-5' id='auth_form_modal_content'
                        ref={contentDiv} >
                        {active === 'login' && <AuthLoginForm close={close} />}
                        {active === 'sigin' && <AuthSiginForm close={close} />}
                  </div>


            </div >
      )
}
