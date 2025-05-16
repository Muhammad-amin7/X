import React, { useContext } from 'react'
import AuthLoginForm from './AuthLoginForm'
import AuthSiginForm from './AuthSiginForm'
import { Context } from '../../Context/Context'
import AuthCheckEmail from './AuthCheckEmail'
import AuthSetPassword from './AuthSetPassword'
import AuthLoginPassword from './AuthLoginPassword'
import AuthResetPasswod from './AuthResetPasswod'

export default function AuthFormModal() {
      const { openThisModal, setOpenThisModal } = useContext(Context)


      return (
            <div className={`${openThisModal ? "flex" : 'hidden'} fixed top-0 left-0 w-screen h-screen bg-[#5b708366] z-10 text-white items-center justify-center`}
                  onClick={(e) => e.currentTarget == e.target && setOpenThisModal(null)}>

                  <div className='w-full h-full lg:w-[700px] lg:h-[750px] bg-black lg:rounded-2xl px-3 py-4  lg:p-5' id='auth_form_modal_content'>
                        {openThisModal === 'login' && <AuthLoginForm />}
                        {openThisModal === 'loginPassword' && <AuthLoginPassword />}
                        {openThisModal === 'forgotPassword' && <AuthResetPasswod />}
                        {openThisModal === 'sigin' && <AuthSiginForm />}
                        {openThisModal === 'CheckEmail' && <AuthCheckEmail />}
                        {openThisModal === 'setPassword' && <AuthSetPassword />}
                  </div>


            </div >
      )
}
