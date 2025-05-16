import { BsFillEmojiSmileFill } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";
import { Context } from "../../Context/Context";
import { useContext } from "react";
import Button from "../../layouts/Button";

export default function CreatePost() {
      const { UserInfos } = useContext(Context)

      return (
            <div className="w-full p-3 border-b-1 border-[rgb(47,51,54)] text-white flex gap-3">
                  <div className="w-10 h-10 overflow-hidden">
                        <img src={UserInfos?.photo} alt="" className="w-full aspect-square object-cover rounded-full" />
                  </div>

                  <div className="w-full">
                        <input type="text" className="w-full border-0 outline-0 placeholder:text-lg py-2" placeholder="What's happining ?" />
                        <div className="flex items-center justify-between w-full border-[rgb(47,51,54)] border-t-1 pt-2 mt-2">
                              <div>
                                    <button>
                                          <BiImageAdd />
                                    </button>

                                    <p className="hidden">Media</p>
                              </div>

                              <Button className={"max-w-25 m-0! py-1!"}>
                                    Post
                              </Button>
                        </div>
                  </div>
            </div>
      )
}
