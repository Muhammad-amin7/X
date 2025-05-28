import { BiImageAdd } from "react-icons/bi";
import { Context } from "../../Context/Context";
import { useCallback, useContext, useEffect, useState } from "react";
import Button from "../../layouts/Button";
import { useCreatePost } from "../../Hooks/useCreatePost";

export default function CreatePost() {
      const { UserInfos } = useContext(Context)
      const { sendData, loading } = useCreatePost()
      const [message, setMessage] = useState("")
      const [image, setImage] = useState("")
      const [imageUrl, setImageUrl] = useState("")
      const [ButtonDisabled, setButtonDisabled] = useState(true)

      useEffect(() => {
            setButtonDisabled(!message.trim().length > 0)
      }, [message, image, setMessage])

      const handleSubmit = useCallback(() => {
            if (!message || !message.trim().length) return setMessage("")
            const formdata = new FormData()
            formdata.append("message", message)
            image && formdata.append("image", image)
            sendData(formdata)
            setMessage("")
            setImage("")
            setImageUrl("")
      }, [message, sendData, image])

      useEffect(() => {
            const handleKeyDown = (e) => {
                  if (e.key === "Enter") {
                        handleSubmit();
                  }
            };

            document.addEventListener('keydown', handleKeyDown);

            return () => {
                  document.removeEventListener('keydown', handleKeyDown);
            };
      }, [handleSubmit]);

      const onImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                  setImageUrl(URL.createObjectURL(event.target.files[0]));
                  setImage(event.target.files[0])
            }
      }

      return (
            <div className="w-full p-3 border-b-1 border-[rgb(47,51,54)] text-white flex gap-3">
                  <div className="w-10 h-10 overflow-hidden">
                        <img src={UserInfos?.photo} alt="" className="w-full aspect-square object-cover rounded-full" />
                  </div>

                  <div className="w-full">
                        {image && <img src={imageUrl} className="w-full max-h-100 object-contain" />}
                        <input type="text" className="w-full border-0 outline-0 placeholder:text-lg py-2"
                              placeholder="What's happining ?"
                              onChange={e => setMessage(e.target.value)}
                              value={message}
                        />
                        <div className="flex items-center justify-between w-full border-[rgb(47,51,54)] border-t-1 pt-2 mt-2">
                              <div>
                                    <label htmlFor="getImageForPost">
                                          <BiImageAdd />
                                    </label>
                                    <input type="file" className="hidden" id="getImageForPost" onChange={onImageChange} />

                                    <p className="hidden">Media</p>
                              </div>

                              <Button className={"max-w-25 m-0! py-1!"} onclickEvent={handleSubmit} loading={loading} disabled={ButtonDisabled}>
                                    Post
                              </Button>
                        </div>
                  </div>
            </div>
      )
}
