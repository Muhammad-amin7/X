import { BiPencil } from "react-icons/bi";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useAddBookmark } from "../../../Hooks/useAddBookmark";
import ItemStatistics from "./ItemStatistics";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../DeleteModal";
import { BiTrash } from "react-icons/bi";

export default function PostItem({ data }) {
      const { name, photo } = data.owner
      const { message, image, created_at, _id, creator } = data.content
      const { data: bookedData } = useAddBookmark()
      const [statistics, setStatistics] = useState({ likes: 999, comments: 999, shows: 999, liked: false })
      const created_data = new Date(created_at)
      const navigate = useNavigate()
      const [deleteModal, setDeleteModal] = useState(false)
      const [changeMenu, setChangeMenu] = useState(false)

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

      useEffect(() => {
            if (bookedData) {
                  setStatistics(prev => ({ ...prev, hasBooked: bookedData.hasBooked }))
            }
      }, [bookedData])

      return (
            <div className='text-white flex p-4 mt-3 w-full border-b-1 border-[#222] lg:hover:bg-[rgba(255,255,255,0.03)]'>
                  <div className='min-w-12 hidden sm:block'>
                        <img src={photo} alt="" className='w-10 h-10 rounded-full' />
                  </div>

                  <div className="w-full">
                        <div className="flex items-center gap-1 sm:gap-2">
                              <div className='min-w-8 sm:min-w-12 sm:hidden'>
                                    <img src={photo} alt="" className='w-7 h-7 sm:w-10 sm:h-10 rounded-full' />
                              </div>

                              {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=(((   PROFILE   )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

                              <div className="w-full lg:flex gap-5">
                                    <h1 className='text-xs sm:text-[16px] text-white font-bold lg:hover:underline cursor-pointer text-nowrap' onClick={() => navigate(`/profile/${data.owner.id}`)}>{name}</h1>
                                    <div className="flex sm:gap-4 max-sm:justify-between w-full">
                                          {/* <p className='text-[10px] sm:text-[15px] text-[#71767b]'>{username}@soon</p> */}
                                          <p className='text-[10px] sm:text-[15px] text-[#71767b]'>{created_data.toLocaleDateString("en-En", { month: "long", day: "numeric", year: "numeric" })}</p>
                                    </div>
                              </div>



                              {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=(((   DELETE   )))=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}
                              {creator
                                    && <ul
                                          className={`gap-1 text-[8px] sm:text-[15px] cursor-pointer relative  `}>
                                          <BiDotsVerticalRounded className="text-[#71767b] lg:hover:text-red-900" onClick={() => setChangeMenu((prev) => !prev)} />

                                          {changeMenu &&
                                                <div className="absolute top-5 right-0 bg-black py-1 px-2 rounded-sm border-1 border-[#333]">
                                                      <li className="flex items-center gap-2 text-xs py-1 border-b-1 border-[#333] hover:text-red-400" onClick={() => setDeleteModal(true)}><BiTrash />Delete</li>
                                                      <li className="flex items-center gap-2 text-xs py-1 hover:text-blue-400"><BiPencil />Change</li>
                                                </div>
                                          }
                                    </ul>
                              }
                              <DeleteModal active={deleteModal} close={setDeleteModal} id={_id} />
                        </div>
                        <p className="text-xs mt-2 sm:text-lg mb-3  ">{message}</p>
                        <img src={image} alt="" loading="lazy" className="rounded-xl" />

                        <ItemStatistics statistics={statistics} setStatistics={setStatistics} id={_id} />
                  </div>

            </div >
      )
}