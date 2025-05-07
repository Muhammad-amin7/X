import React from 'react'

export default function Button({ className, children, onclickEvent }) {
      return (
            <button className={`text-black justify-center flex w-full items-center px-[0.9vw] py-[0.6vw] bg-white rounded-3xl my-[0.9vw] gap-[0.6vw] font-semibold text-[1vw] font-large hover:bg-black outline-2 hover:outline-white hover:text-white duration-300 active:scale-95 ${className}`} onClick={onclickEvent}>
                  {children}
            </button>
      )
}
