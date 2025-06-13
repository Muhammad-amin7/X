import React, { useEffect } from 'react';
import HomeNav from '../Components/Home/HomeNav';
import CreatePost from '../Components/Home/CreatePost';
import PostItem from '../Components/Home/Post item/PostItem';
import { Context } from '../Context/Context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowingsPost, fetchPosts } from '../Services/post/post.services';
import { useState } from 'react';

export default function Home() {
      const { posts, loading, followingsPosts } = useSelector(state => state.posts)
      const [followersPost, setFollowersPost] = useState(false)
      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(fetchPosts({ limit: 10 }))
      }, [])

      useEffect(() => {
            dispatch(fetchFollowingsPost({ limit: 10 }))
      }, [])
      return (
            <div className='w-full'>
                  <HomeNav state={followersPost} setState={setFollowersPost} />
                  <CreatePost />
                  {followersPost ?
                        followingsPosts && followingsPosts?.map((item) => (
                              <PostItem data={item} key={item?.content?._id} />
                        )) :
                        posts && posts?.map((item) => (
                              <PostItem data={item} key={item?.content?._id} />
                        ))
                  }

                  {loading && <div className='w-10 h-10 border-1 border-[gray] border-b-transparent rounded-full m-auto my-20 animate-spin'></div>}
            </div>
      );
}
