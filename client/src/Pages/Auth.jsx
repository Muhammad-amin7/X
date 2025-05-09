import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import React, { useContext } from 'react';
import Button from "../layouts/Button";
import Logo from "../layouts/Logo";
import AuthFormModal from "../Components/AuthFormModal";
import { Context } from "../Context/Context";

export default function Auth() {
      const { openThisModal, setOpenThisModal } = useContext(Context)

      const handleLoginGoogle = async () => {
            window.location.href = 'http://localhost:3000/user/auth/google';
      };
      const handleLoginGithub = async () => {
            window.location.href = 'http://localhost:3000/user/auth/github';
      };


      return (
            <section className='w-screen min-h-screen flex items-center justify-center max-lg:py-10'>
                  <div className='w-4/5 lg:w-[70vw] 2xl:w-[80vw] m-auto lg:flex items-center justify-between h-full'>
                        <Logo className='w-10 lg:w-[30vw]' />

                        <div className="text-white">
                              <h1 className="text-2xl sm:text-6xl lg:text-[3.1vw] my-3 sm:my-12 lg:my-[2.5vw] font-extrabold font-[Tagesschrift,system-ui]">Happening now</h1>
                              <h2 className="text-lg sm:text-3xl lg:text-[1.6vw] mb-10 sm:mb-[1.7vw] text-[rgb(231, 233, 234)]">Join today.</h2>

                              <div className="lg:w-[80%]">
                                    <Button onclickEvent={handleLoginGoogle}>
                                          <span>Sign up with google</span>
                                          <FcGoogle />
                                    </Button>
                                    <Button onclickEvent={handleLoginGithub}>
                                          <span>Sign up with GitHub</span>
                                          <BsGithub />
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 lg:gap-[0.4vw] my-[0.8vw]">
                                          <div className={lineStyle}></div>
                                          <p className="uppercase text-[#e9e7ea] text-sm lg:text-[1vw]">or</p>
                                          <div className={lineStyle}></div>
                                    </div>

                                    <Button
                                          className={`bg-blue-500! hover:bg-black! outline-[0.2vw]! outline-blue-500! text-white! hover:text-blue-500!`}
                                          onclickEvent={() => setOpenThisModal('sigin')}
                                    >
                                          Create account
                                    </Button>

                                    <p className="text-[8px] sm:text-xs lg:text-[0.6vw] text-[#71767b] mt-[1vw]">
                                          By signing up, you agree to the <span className="text-blue-700 hover:underline">Terms of Service</span> and <span className="text-blue-700 hover:underline">Privacy Policy</span>, including <span className="text-blue-700 hover:underline">Cookie Use</span>.
                                    </p>

                                    <div className="mt-[2vw]">
                                          <h3 className="text-sm sm:text-md lg:text-[1.1vw] text-[#E7E9EA] font-semibold">Already have an account?</h3>

                                          <Button
                                                className={`bg-black! outline-[0.1vw]! outline-gray-600! text-white! hover:text-blue-500!`}
                                                onclickEvent={() => setOpenThisModal('login')}
                                          >
                                                Sign in
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  {openThisModal !== null && <AuthFormModal />}
            </section>
      );
}

const lineStyle = "w-full h-[0.05vw] bg-[#2f3336] mt-[0.3vw]";
