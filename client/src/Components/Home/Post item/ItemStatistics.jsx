import { BiTrash } from "react-icons/bi";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { likePost } from "../../../Services/post/post.services";
import { useAddBookmark } from "../../../Hooks/useAddBookmark";
import { FaEye, FaHeart, FaTrash, FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import Comment from "../Comment";
import DeleteModal from "../DeleteModal";


export default function ItemStatistics({ statistics, setStatistics, id, creator }) {
      const dispatch = useDispatch()
      const [toggleComment, setToggleComment] = useState(false)
      const [deleteModal, setDeleteModal] = useState(false)
      const handleOnLike = () => {
            dispatch(likePost(id))
      }
      const { sendId: sendBookmarkId } = useAddBookmark()
      return (
            <ul className='flex items-center justify-between mt-6 px-4F'>

                  {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=(((   COMMENT   )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                  <li className={`${LiStyle} cursor-pointer`} onClick={() => setToggleComment(true)}>
                        <FaRegComment className="text-[#71767b] w-8 h-8 py-2 lg:hover:bg-[rgba(0,255,255,0.4)] rounded-full lg:hover:text-cyan-400" /> {statistics.comments}
                  </li>
                  {toggleComment && <Comment id={id} close={setToggleComment} />}



                  {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=(((   LIKE   )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                  <li
                        className={`${LiStyle} cursor-pointer`}
                        onClick={handleOnLike}>
                        {statistics.isLiked
                              ? <FaHeart className="text-red-500" />
                              : <AiOutlineHeart className="text-[#71767b] w-8 h-8 py-2 lg:hover:bg-[rgba(220,20,60,0.4)] lg:hover:text-red-400 rounded-full" />}
                        {statistics.likes}
                  </li>




                  {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=(((   BOOKMARK   )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                  <li
                        onClick={() => {
                              sendBookmarkId(id);
                              setStatistics(prev => ({ ...prev, hasBooked: !statistics.hasBooked }))
                        }}
                        className={`${LiStyle} cursor-pointer text-[#71767b] lg:hover:text-white w-8 h-8 p-2 lg:hover:bg-[rgba(255,255,255,0.4)] rounded-full`}>
                        {statistics.hasBooked
                              ? <FaBookmark className="text-white" />
                              : <FaRegBookmark />}
                  </li>





                  {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=(((   DELETE   )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                  {creator
                        && <li
                              onClick={() => setDeleteModal(true)}
                              className={`${LiStyle} cursor-pointer`}>
                              <BiTrash className="text-[#71767b] lg:hover:text-red-900" />
                        </li>}
                  <DeleteModal active={deleteModal} close={setDeleteModal} id={id} />
            </ul>
      )
}


const LiStyle = "flex items-center gap-1 text-[8px] sm:text-[15px]"
const iconsStyle = "flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"