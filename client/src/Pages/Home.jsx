import React, { useEffect } from 'react';
import HomeNav from '../Components/Home/HomeNav';
import CreatePost from '../Components/Home/CreatePost';
import PostItem from '../Components/Home/PostItem';
import { Context } from '../Context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../Services/post/post.services';

export default function Home() {
      const { posts, loading } = useSelector(state => state.posts)
      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(fetchPosts({ limit: 10 }))
      }, [])
      return (
            <div className='w-full'>
                  <HomeNav />
                  <CreatePost />
                  {posts && posts?.map((item) => (
                        <PostItem data={item} key={item?.content?._id} />
                  ))}

                  {loading && <div className='w-10 h-10 border-1 border-[gray] border-b-transparent rounded-full m-auto my-20 animate-spin'></div>}
            </div>
      );
}
