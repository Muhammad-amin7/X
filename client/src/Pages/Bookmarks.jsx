import { AiOutlineFileExcel } from "react-icons/ai";
import React, { useEffect } from 'react'
import PostItem from '../Components/Home/Post item/PostItem'
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarks } from "../Services/post/post.services";

export default function Bookmarks() {
      const { bookmarks, bookmarksLoading: loading } = useSelector((state) => state.posts)
      const dispatch = useDispatch()
      useEffect(() => { dispatch(fetchBookmarks()) }, [])

      return (
            <div>
                  {bookmarks && bookmarks?.contents?.map((item, index) => {
                        return <PostItem data={item} key={index} />
                  })}

                  {loading && <div className='w-10 h-10 border-1 border-[gray] border-b-transparent rounded-full m-auto my-20 animate-spin'></div>}
                  {
                        (bookmarks && !loading && bookmarks?.contents?.length === 0) &&
                        <div className='w-full mt-20 text-center text-xl text-[#555]'>
                              <AiOutlineFileExcel className="m-auto text-7xl mb-10" />
                              <p className="">You haven't added any bookmarks yet</p>
                        </div>
                  }
            </div>
      )
}
