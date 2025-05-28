import { useState, useEffect } from "react";
import { BiBookmark } from "react-icons/bi";
import { FaEye, FaHeart, FaComments } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { useAddLike } from "../../Hooks/useAddLike";
import Comment from "./Comment";

export default function PostItem({ data }) {
      const { name, photo, username } = data.owner
      const { message, image, created_at, _id } = data.content

      const { sendId, data: likedata } = useAddLike()

      const [statistics, setStatistics] = useState({ likes: 999, comments: 999, shows: 999, liked: false })
      const [toggleComment, setToggleComment] = useState(false)
      const created_data = new Date(created_at)

      useEffect(() => {
            if (data.content) {
                  setStatistics({
                        likes: data.content.likes,
                        comments: data.content.comments,
                        shows: data.content.shows,
                        isLiked: data.content.isLiked
                  })
            }
      }, [data])

      useEffect(() => {
            if (likedata) {
                  setStatistics(prev => ({ ...prev, likes: likedata.likes, isLiked: likedata.liked }))
            }
      }, [likedata])

      return (
            <div className='text-white flex p-4 mt-3 w-full'>
                  <div className='min-w-12'>
                        <img src={photo} alt="" className='w-10 h-10 rounded-full' />
                  </div>


                  <div className="w-full">
                        <div className="flex items-center gap-2">
                              <h1 className='text-[16px] text-white font-bold lg:hover:underline cursor-pointer'>{name}</h1>
                              <p className='text-[15px] text-[#71767b]'>{username}@soon</p>
                              <p className='text-[15px] text-[#71767b]'>{created_data.toLocaleDateString("en-En", { month: "long", day: "numeric", year: "numeric" })}</p>
                        </div>
                        <p className="text-lg mb-3">{message}</p>
                        <img src={image} alt="" />
                        <ul className='flex items-center justify-between mt-2 w-2/3'>
                              <li className={`${LiStyle} cursor-pointer`} onClick={() => setToggleComment(true)}>
                                    <FaComments className="text-[#71767b] lg:hover:text-blue-300" /> {statistics.comments}
                              </li>
                              {toggleComment && <Comment id={_id} close={setToggleComment} />}

                              <li className={`${LiStyle} cursor-pointer`} onClick={() => { sendId(_id); setStatistics(prev => ({ ...prev, isLIked: !statistics.isLiked })) }}>
                                    {statistics.isLiked
                                          ? <FaHeart className="text-red-500" />
                                          : <AiOutlineHeart className="text-[#71767b] lg:hover:text-red-300" />}
                                    {statistics.likes}
                              </li>

                              <li className={`${LiStyle}`}><FaEye className="text-[#71767b]" />{statistics.shows}</li>

                              <li className={`${LiStyle} cursor-pointer`}><BiBookmark className="text-[#71767b] lg:hover:text-white" /></li>
                        </ul>
                  </div>

            </div>
      )
}


const LiStyle = "flex items-center gap-1 text-[15px]"
const LiIcons = "text-[#71767b]"