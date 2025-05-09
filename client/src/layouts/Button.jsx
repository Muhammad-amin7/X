import React from 'react'

export default function Button({ className, children, onclickEvent, submit, loading, disabled }) {
      return (
            <button disabled={disabled} type={submit && submit} className={`text-black justify-center flex w-full items-center px-[0.9vw] py-[0.6vw] bg-white rounded-3xl my-4 lg:my-[0.9vw] gap-[0.6vw] font-semibold text-sm lg:text-[1vw] font-large hover:bg-black outline-2 hover:outline-white hover:text-white duration-300 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed ${className} cursor-pointer`} onClick={onclickEvent}>
                  {loading ? <span className='btn_loader w-7 h-7 rounded-[50%] border-3 border-white border-b-blue-700 '></span> : children}
            </button>
      )
}
