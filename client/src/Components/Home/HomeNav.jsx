import React from 'react'

export default function HomeNav() {
      return (
            <nav className='text-white w-full'>
                  <ul className='w-full flex items-center'>
                        <li className={listyle}>For you</li>
                        <li className={listyle}>Following</li>
                  </ul>
            </nav>
      )
}
const listyle = "w-full text-center py-5 border-[rgb(47,51,54)] border-b-1"