import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../../Services/post/post.services'
const btnstyle = "py-2 w-25 rounded-md text-md active:scale-95 cursor-pointer"

export default function DeleteModal({ active, close, id }) {
      // const { getPosts } = useGetPosts()
      const dispatch = useDispatch()

      const handleDeletePost = async () => {
           await dispatch(deletePost(id))
      }

      // useEffect(() => {
      //       if (data?.ok) {
      //             close(true)
      //       }
      // }, [data, close])

      {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( Functions to close )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */ }
      const handleCloseWithBackdrop = e => {
            if (e.target == e.currentTarget) {
                  close(false)
            }
      }

      const handleKeyDown = useCallback(e => {
            if (e.key == 'Escape') {
                  close(false)
            }
      }, [close])


      useEffect(() => {
            window.addEventListener('keydown', handleKeyDown)
            return () => window.removeEventListener('keydown', handleKeyDown)
      }, [handleKeyDown])

      return (
            <div className={`fixed top-0 left-0 w-full h-[100dvh] flex items-center justify-center bg-[rgba(50,50,50,0.3)] duration-300 ${active ? 'opacity-100 z-30' : 'opacity-0 z-[-1]'}`} onClick={handleCloseWithBackdrop}>
                  <div className='rounded-xl bg-black p-3 border-1 border-[#666] '>
                        <h1 className='text-white text-xl'>Are you sure you want to delete this?</h1>
                        <p className='text-md text-[#444] pb-5'>Once deleted, this action cannot be undone. Do you still want to proceed?</p>


                        <div className='flex items-center justify-between'>
                              <button
                                    className={`${btnstyle} bg-[#999] text-white`}
                                    onClick={() => close(false)}>
                                    Cencel
                              </button>

                              <button
                                    className={`${btnstyle} bg-crimson text-white flex items-center justify-center bg-[crimson]`}
                                    onClick={handleDeletePost}
                                    // disabled={loading}
                              >
                                    {/* {loading ? (
                                          <span
                                                className="w-5 h-5 border-2 border-white border-b-transparent rounded-full animate-spin"
                                          ></span>
                                    ) : (
                                          "Delete"
                                    )} */}
                                    Delete
                              </button>

                        </div>
                  </div>
            </div >
      )
}
