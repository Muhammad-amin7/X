import { BsFillSendFill } from "react-icons/bs";
import { CgCloseO } from "react-icons/cg";
// import { useAddComment } from '../../Hooks/useAddComment';
// import { useGetComment } from '../../Hooks/useGetComments';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComments } from "../../Services/post/post.services";

export default function Comment({ id, close }) {
      const [inpVal, setInpVal] = useState("");
      const { comments, commentsLoading } = useSelector(state => state.posts)
      const dispatch = useDispatch()

      {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( Functions to get data )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */ }
      useEffect(() => {
            if (id) {
                  dispatch(fetchComments({ postId: id, limit: 10 }))
            }
      }, [id]);

      {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( Function to send data )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */ }
      const handleSend = () => {
            if (inpVal.trim().length) {
                  dispatch(createComment({ message: inpVal, postId: id }))
                  setInpVal("");
            }
      }


      {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( Function to format time )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */ }
      const handleTimeFormater = (time) => {
            const options = { year: "numeric", day: "numeric", month: "long", hour: "numeric", minute: "numeric" };
            return new Date(time).toLocaleDateString("en-EN", options);
      };

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
            <div className="top-0 left-0 flex items-center justify-center fixed bg-[rgba(80,80,80,0.3)] text-white w-screen h-screen z-50" onClick={handleCloseWithBackdrop}>
                  <div className='bg-black pt-4 rounded-sm overflow-y-auto max-h-[80vh] block w-[95%] max-w-[500px]'>
                        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( When the comment list is empty)))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                        {!commentsLoading && !comments[id]?.length && (
                              <div className='py-20 text-center'>
                                    <CgCloseO className="m-auto text-4xl mb-2" />
                                    <h1>No comments yet</h1>
                              </div>
                        )}

                        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( COMMENTS )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                        <div>
                              {comments[id]?.map(({ comment, owner }) => (
                                    <div key={comment._id} className='flex gap-4 mt-4 last:mb-12 px-2'>
                                          <img
                                                src={owner.photo}
                                                alt={`${owner.name} profile photo`}
                                                className='w-10 h-10 min-w-10 rounded-full'
                                          />
                                          <div>
                                                <p className='text-md text-[#999]'>
                                                      {owner.name}
                                                      <span className='ml-5 text-[12px] text-[#444]'>
                                                            {handleTimeFormater(comment?.created_at)}
                                                      </span>
                                                </p>
                                                <p className='max-w-100'>{comment.message}</p>
                                          </div>
                                    </div>
                              ))}
                        </div>

                        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( LOADER )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                        {commentsLoading && <div className="w-10 h-10 m-auto my-20 border-2 border-[#777] border-b-0 animate-spin rounded-full"></div>}

                        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=((( INPUT )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                        <div className="flex items-center sticky left-0 w-full bg-black bottom-0 mt-4">
                              <input
                                    type="text"
                                    value={inpVal}
                                    onChange={(e) => setInpVal(e.target.value)}
                                    onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSend();
                                          }
                                    }}
                                    placeholder="Write a comment..."
                                    className='border border-[gray] w-full rounded-md outline-0 px-3 py-2 text-white'
                              />
                              <button
                                    onClick={handleSend}
                                    className='w-10 h-10 min-w-10 flex items-center justify-center text-black bg-white rounded-3xl font-bold cursor-pointer ml-3 hover:opacity-90'
                              >
                                    <BsFillSendFill />
                              </button>
                        </div>
                  </div>
            </div>
      );
}
