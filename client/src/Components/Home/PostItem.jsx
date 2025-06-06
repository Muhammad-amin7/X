import { useState, useEffect } from "react";
import { FaEye, FaHeart, FaComments, FaTrash, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Comment from "./Comment";
import DeleteModal from "./DeleteModal";
import { useAddBookmark } from "../../Hooks/useAddBookmark";
import { useDispatch } from "react-redux";
import { likePost } from "../../Services/post/post.services";

export default function PostItem({ data }) {
      const [deleteModal, setDeleteModal] = useState(false)
      const { name, photo, username } = data.owner
      const { message, image, created_at, _id, creator } = data.content
      const { sendId: sendBookmarkId, data: bookedData } = useAddBookmark()

      const [statistics, setStatistics] = useState({ likes: 999, comments: 999, shows: 999, liked: false })
      const [toggleComment, setToggleComment] = useState(false)
      const created_data = new Date(created_at)

      const dispatch = useDispatch()

      useEffect(() => {
            if (data.content) {
                  setStatistics({
                        likes: data.content.likes,
                        comments: data.content.comments,
                        shows: data.content.shows,
                        isLiked: data.content.isLiked,
                        hasBooked: data.content.hasBooked
                  })
            }
      }, [data])

      const handleOnLike = () => {
            dispatch(likePost(_id))
      }

      useEffect(() => {
            if (bookedData) {
                  setStatistics(prev => ({ ...prev, hasBooked: bookedData.hasBooked }))
            }
      }, [bookedData])

      return (
            <div className='text-white flex p-4 mt-3 w-full'>
                  <div className='min-w-12 hidden sm:block'>
                        <img src={photo} alt="" className='w-10 h-10 rounded-full' />
                  </div>


                  <div className="w-full">
                        <div className="flex items-center gap-1 sm:gap-2">
                              <div className='min-w-8 sm:min-w-12'>
                                    <img src={photo} alt="" className='w-7 h-7 sm:w-10 sm:h-10 rounded-full' />
                              </div>
                              <div className="w-full">
                                    <h1 className='text-xs sm:text-[16px] text-white font-bold lg:hover:underline cursor-pointer'>{name}</h1>
                                    <div className="flex sm:gap-4 max-sm:justify-between w-full">
                                          <p className='text-[10px] sm:text-[15px] text-[#71767b]'>{username}@soon</p>
                                          <p className='text-[10px] sm:text-[15px] text-[#71767b]'>{created_data.toLocaleDateString("en-En", { month: "long", day: "numeric", year: "numeric" })}</p>
                                    </div>
                              </div>
                        </div>
                        <p className="text-xs mt-2 sm:text-lg mb-3">{message}</p>
                        <img src={image} alt="" />
                        <ul className='flex items-center justify-between mt-2 w-2/3'>
                              <li className={`${LiStyle} cursor-pointer`} onClick={() => setToggleComment(true)}>
                                    <FaComments className="text-[#71767b] lg:hover:text-blue-300" /> {statistics.comments}
                              </li>
                              {toggleComment && <Comment id={_id} close={setToggleComment} />}

                              <li
                                    className={`${LiStyle} cursor-pointer`}
                                    onClick={handleOnLike}>
                                    {statistics.isLiked
                                          ? <FaHeart className="text-red-500" />
                                          : <AiOutlineHeart className="text-[#71767b] lg:hover:text-red-300" />}
                                    {statistics.likes}
                              </li>

                              <li className={`${LiStyle}`}><FaEye className="text-[#71767b]" />{statistics.shows}</li>

                              <li
                                    onClick={() => {
                                          sendBookmarkId(_id);
                                          setStatistics(prev => ({ ...prev, hasBooked: !statistics.hasBooked }))
                                    }}
                                    className={`${LiStyle} cursor-pointer text-[#71767b] lg:hover:text-white`}>
                                    {statistics.hasBooked
                                          ? <FaBookmark className="text-white" />
                                          : <FaRegBookmark />}
                              </li>

                              {creator
                                    && <li
                                          onClick={() => setDeleteModal(true)}
                                          className={`${LiStyle} cursor-pointer`}>
                                          <FaTrash className="text-[#71767b] lg:hover:text-red-900" />
                                    </li>}
                              <DeleteModal active={deleteModal} close={setDeleteModal} id={_id} />
                        </ul>
                  </div>

            </div >
      )
}


const LiStyle = "flex items-center gap-1 text-[8px] sm:text-[15px]"