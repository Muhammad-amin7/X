import React, { useContext } from 'react'
import AuthLoginForm from './AuthLoginForm'
import AuthSiginForm from './AuthSiginForm'
import { Context } from '../Context/Context'
import AuthCheckEmail from './AuthCheckEmail'
import AuthSetPassword from './AuthSetPassword'
import AuthLoginPassword from './AuthLoginPassword'

export default function AuthFormModal() {
      const { openThisModal, setOpenThisModal } = useContext(Context)


      return (
            <div className={`${openThisModal ? "flex" : 'hidden'} fixed top-0 left-0 w-screen h-screen bg-[#5b708366] z-10 text-white items-center justify-center`}
                  onClick={(e) => e.currentTarget == e.target && setOpenThisModal(null)}>

                  <div className='w-[700px] h-[750px] bg-black rounded-2xl p-5' id='auth_form_modal_content'>
                        {openThisModal === 'login' && <AuthLoginForm />}
                        {openThisModal === 'loginPassword' && <AuthLoginPassword />}
                        {openThisModal === 'sigin' && <AuthSiginForm />}
                        {openThisModal === 'CheckEmail' && <AuthCheckEmail />}
                        {openThisModal === 'setPassword' && <AuthSetPassword />}
                  </div>


            </div >
      )
}
