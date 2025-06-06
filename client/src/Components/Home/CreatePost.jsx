import { BiImageAdd } from "react-icons/bi";
import { useEffect, useState } from "react";
import Button from "../../layouts/Button";
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from "../../Services/post/post.services";

export default function CreatePost() {
      const { owner } = useSelector((state) => state.user)
      const { createPostLoading } = useSelector((state) => state.posts)
      const [helperState, setHelperState] = useState({ message: "", image: null, imageUrl: null, btnDisabled: true })
      const dispatch = useDispatch()

      useEffect(() => {
            setHelperState((prev) => ({ ...prev, btnDisabled: helperState.message.trim().length === 0 }))
      }, [helperState.message])

      const handleSubmit = async (e) => {
            e.preventDefault()
            if (!helperState.message || helperState.message.trim().length === 0) {
                  return setHelperState(prev => ({ ...prev, message: "" }));
            }

            const formdata = new FormData()
            formdata.append("message", helperState.message)
            helperState.image && formdata.append("image", helperState.image)
            dispatch(createPost(formdata))
            setHelperState({ message: "", image: null, imageUrl: null, btnDisabled: true })
      }


      const onImageChange = (event) => {
            if (event.target.files && event.target.files[0]) {
                  setHelperState(prev => ({ ...prev, imageUrl: URL.createObjectURL(event.target.files[0]) }));
                  setHelperState(prev => ({ ...prev, image: event.target.files[0] }));
            }
      }

      return (
            <div className="w-full p-3 border-b-1 border-[rgb(47,51,54)] text-white flex gap-3">
                  <div className="w-10 h-10 overflow-hidden">
                        <img src={owner?.photo} alt="" className="w-full aspect-square object-cover rounded-full" />
                  </div>

                  <form className="w-full" onSubmit={handleSubmit}>
                        {helperState.image && <img src={helperState.imageUrl} className="w-full max-h-100 object-contain" />}
                        <input type="text" className="w-full border-0 outline-0 placeholder:text-lg py-2"
                              placeholder="What's happining ?"
                              onChange={e => setHelperState(prev => ({ ...prev, message: e.target.value }))}
                              value={helperState.message}
                        />
                        <div className="flex items-center justify-between w-full border-[rgb(47,51,54)] border-t-1 pt-2 mt-2">
                              <div>
                                    <label htmlFor="getImageForPost">
                                          <BiImageAdd />
                                    </label>
                                    <input type="file" className="hidden" id="getImageForPost" onChange={onImageChange} />

                                    <p className="hidden">Media</p>
                              </div>

                              <Button className={"max-w-25 m-0! py-1!"} onclickEvent={handleSubmit} loading={createPostLoading} disabled={helperState.btnDisabled}>
                                    Post
                              </Button>
                        </div>
                  </form>
            </div>
      )
}
