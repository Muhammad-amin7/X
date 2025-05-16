import { FaRegUser } from "react-icons/fa";
import { FaSearch, FaHome } from "react-icons/fa";
import Logo from './Logo'
import { Link, NavLink } from "react-router-dom";
import { FaBell } from "react-icons/fa6";
import Button from "./Button";

export default function NavBar() {
      // pages data
      const menuLink = [
            { title: "Home", link: "/home", Icon: FaHome },
            { title: "Explore", link: "/explore", Icon: FaSearch },
            { title: "Notifications", link: "/notifications", Icon: FaBell },
            { title: "Profile", link: "/profile", Icon: FaRegUser },
      ]

      return (
            <aside className='border-r-1 border-[rgba(180,180,180,0.5)] h-screen py-5 pr-10'>
                  <Link to={"/home"}>
                        <Logo className="w-12! h-12!" />
                  </Link>
                  <ul className="mt-10 h-[60vh]">
                        {menuLink.map((item, id) => (
                              <NavLink key={id} to={item.link} className={({ isActive }) => isActive ? "font-black text-white" : "font-medium text-[#e7e9ea]"}>
                                    <li
                                          className="mt-2 flex gap-4 text-xl p-3 lg:hover:bg-[#e7e9ea2f] rounded-3xl w-min cursor-pointer capitalize">
                                          <div className="flex">
                                                <item.Icon className="text-2xl" />
                                                {/* <span className="w-2 h-2 block rounded-[50%] bg-blue-600"></span> */}
                                          </div>
                                          <h1>{item.title}</h1>
                                    </li>
                              </NavLink>

                        ))}
                  </ul>
                  <Button>Post</Button>
                  <h1 className="text-white">{"Hello"}</h1>
            </aside>
      )
}
