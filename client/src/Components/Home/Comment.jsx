import React from 'react'
import { useAddComment } from '../../Hooks/useAddComment'
import { useGetComment } from '../../Hooks/useGetComments'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Comment({ id }) {
      const [inpVal, setInpVal] = useState("")
      const { send } = useAddComment()
      const { getFunc, data } = useGetComment()

      useEffect(() => {
            getFunc({ id: id, limit: 10 })
      }, [])

      const handleTimeFormater = (time) => {
            const option = { year: "numeric", day: "numeric", month: "long" }
            const format = new Date(time).toLocaleDateString("en-En", option)
            return format
      }

      return (
            <div className="top-0 left-0 flex items-center justify-center fixed bg-[rgba(80,80,80,0.3)] text-white w-screen h-screen">
                  <div className='bg-black py-4 px-2 rounded-sm overflow-y-auto max-h-4/5 block pb-10'>
                        <div>{data?.data.map(({ comment, owner }) => {
                              return <div className='flex gap-4 mt-4 last:mb-12'>
                                    <img src={owner.photo} alt={name + " " + "profil photo"} className='w-10 h-10 min-w-10 rounded-full' />
                                    <div>
                                          <p className='text-md text-[gray]'>{owner.name} <span className='ml-3 text-sm'>{handleTimeFormater(comment.created_at)}</span></p>
                                          <p className='max-w-100'>{comment.message}</p>
                                    </div>
                              </div>
                        })}</div>
                        <div className="flex items-center sticky left-0 w-full bg-black ">
                              <input type="text" value={inpVal} onChange={(e) => setInpVal(e.target.value)} className='border-1 border-[gray] w-full rounded-md outline-0 px-3 py-2' />
                              <button onClick={() => { inpVal.length && send({ message: inpVal, postId: id }); setInpVal("") }}
                                    className='text-black bg-white py-2 px-4 rounded-3xl font-bold cursor-pointer ml-3 hover:opacity-90'>Send</button>
                        </div>
                  </div>
            </div>
      )
}
