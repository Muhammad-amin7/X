import { BsSearch } from "react-icons/bs";
import { CgHome } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import Logo from './Logo'
import { Link, NavLink } from "react-router-dom";
import { FaRegBell, FaRegBookmark } from "react-icons/fa6";
import Button from "./Button";
import { useSelector } from 'react-redux';

export default function NavBar() {
      const { owner } = useSelector(state => state.user)
      // pages data
      const menuLink = [
            { title: "Home", link: "/home", Icon: CgHome },
            { title: "Explore", link: "/explore", Icon: BsSearch },
            { title: "Notifications", link: "/notifications", Icon: FaRegBell },
            { title: "Profile", link: `/profile/${owner._id}`, Icon: FaRegUser },
            { title: "Bookmarks", link: "/bookmarks", Icon: FaRegBookmark },
      ]

      return (
            <aside className='border-r-1 border-[rgb(47,51,54)] h-[100dvh] py-3 pr-10 sticky top-0 grid grid-cols-1 grid-rows-[80vh_30vh]'>
                  <div> <Link to={"/home"}>
                        <Logo className="w-7! h-7! ml-3" />
                  </Link>
                        <ul className="">
                              {menuLink.map((item, id) => (
                                    <NavLink key={id} to={item.link} className={({ isActive }) => isActive ? "font-bold text-white" : "text-[#e7e9ea]"}>
                                          <li
                                                className="mt-2 flex gap-8 text-xl p-3 lg:hover:bg-[#e7e9ea2f] rounded-3xl w-min cursor-pointer capitalize">
                                                <div className="flex">
                                                      <item.Icon className="text-3xl" />
                                                      {/* <span className="w-2 h-2 block rounded-[50%] bg-blue-600"></span> */}
                                                </div>
                                                <h1 >{item.title}</h1>
                                          </li>
                                    </NavLink>

                              ))}
                        </ul>
                  </div>
                  <div>
                        <Button>Post</Button>
                        <div className="flex gap-3">
                              <div className="min-w-11">
                                    <img src={owner?.photo} alt="" className="w-10 h-10 rounded-full" />
                              </div>
                              <div>
                                    <h1 className="text-white">{owner?.name}</h1>
                                    <p className="text-[#777] text-xs">{owner?.email}</p>
                              </div>
                        </div>
                  </div>
            </aside>
      )
}
