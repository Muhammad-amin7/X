import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";

export default function ProfileNames({ info }) {
      const [joinedTime, setJoinedTime] = useState(null)
      useEffect(() => {
            setJoinedTime(new Date(info?.joined_time).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
            }))
      }, [info])
      return (
            <div className='p-5 mt-4 text-white'>
                  <h1 className="text-xl font-bold capitalize">{info?.name}</h1>
                  <p className="text-[#71767b] text-md">@comingsoon</p>
                  <div className="flex gap-1 text-sm text-[#71767b] my-3">
                        <BiCalendar />Joined {joinedTime && joinedTime}
                  </div>

                  <div className="flex gap-10 text-sm text-white font-semibold">
                        <p className="lg:hover:underline cursor-pointer">{info?.following?.length} <span className="text-[#71767b] font-normal">Following</span></p>
                        <p className="lg:hover:underline cursor-pointer">{info?.followers?.length}<span className="text-[#71767b] font-normal">Followers</span></p>
                  </div>
            </div>
      )
}