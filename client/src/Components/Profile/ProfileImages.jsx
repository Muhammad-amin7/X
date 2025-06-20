import { useState } from 'react';
import ProfileEditModal from './ProfileEditModal'
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../../Services/user/user.services';

export default function ProfileImages({ info }) {
      const [ChangeModal, setChangeModal] = useState(false);
      const dispatch = useDispatch()
      const { followLoading } = useSelector((state) => state.user)
      return (
            <>
                  <div className='w-full h-50 relative'>
                        <div className='bg-[#313336] w-full h-full'>
                              {
                                    info?.photo_background &&
                                    <img src={info.photo_background} alt="" className='w-full h-full block' />
                              }
                        </div>
                        <div className='w-35 aspect-square bg-blue-700 rounded-[50%] absolute -bottom-1/3 left-[20px] flex items-center justify-center text-5xl text-white border-5 border-black overflow-hidden'>
                              {
                                    info?.photo ?
                                          <img src={info?.photo} alt="" className='w-full h-full block' /> :
                                          <p>{info?.name?.split("")[0]}</p>
                              }
                        </div>
                  </div>

                  {info?.owner ?
                        <button onClick={() => setChangeModal(true)} className='rounded-[100px] border-[#536471] border-1 block ml-auto mt-3 mr-3 px-4 py-1 text-white text-md font-semibold'>Edit profile</button >
                        : <button
                              onClick={() => dispatch(followUser(info._id))}
                              className={`rounded-[100px] border-[#536471] border-1 block ml-auto mt-3 mr-3 px-4 py-1 text-md font-semibold w-30 ${info?.hasFollowed ? "text-white bg-black" : "text-black bg-white"}`}>
                              {followLoading ? <span className='block w-6 h-6 border-1 border-gray-700 rounded-full border-b-transparent animate-spin m-auto' /> : info?.hasFollowed ? "unfollow" : "Follow"}
                        </button>
                  }
                  {ChangeModal && <ProfileEditModal info={info} close={setChangeModal} />}
            </>
      )
}
