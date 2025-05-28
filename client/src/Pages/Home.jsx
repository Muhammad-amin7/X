import React, { useContext } from 'react'
import HomeNav from '../Components/Home/HomeNav'
import CreatePost from '../Components/Home/CreatePost'
import PostItem from '../Components/Home/PostItem'
import { useGetPosts } from '../Hooks/useGetPosts'
import { Context } from '../Context/Context'

export default function Home() {
      useGetPosts()
      const {Contents , setContents} = useContext(Context)
      return (
            <div>
                  <HomeNav />
                  <CreatePost />
                  {Contents?.contents?.map(item => {
                        return <PostItem data={item} key={item?.content?._id} />
                  })}
            </div>
      )
}
