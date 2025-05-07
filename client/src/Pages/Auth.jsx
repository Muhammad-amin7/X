import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from 'react';
import Button from "../layouts/Button";
import Logo from "../layouts/Logo";
import AuthFormModal from "../Components/AuthFormModal";

export default function Auth() {
      const [showModalToggler, setShowModalToggler] = useState(null);

      const handleLoginGoogle = async () => {
            window.location.href = 'http://localhost:3000/user/auth/google';
      };
      const handleLoginGithub = async () => {
            window.location.href = 'http://localhost:3000/user/auth/github';
      };

      useEffect(() => {
            fetch('http://localhost:3000/hello', {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json"
                  },
            })
                  .then(data => data.json())
                  .then(body => alert(body))
      }, []);

      return (
            <section className='w-screen h-screen'>
                  <div className='w-[70vw] 2xl:w-[80vw] m-auto lg:flex items-center justify-between h-full'>
                        <Logo className='w-[30vw]' />

                        <div className="text-white">
                              <h1 className="text-[3.1vw] my-[2.5vw] font-extrabold font-[Tagesschrift,system-ui]">Happening now</h1>
                              <h2 className="mb-[1.7vw] text-[1.6vw] text-[rgb(231, 233, 234)]">Join today.</h2>

                              <div className="lg:w-[80%]">
                                    <Button onclickEvent={handleLoginGoogle}>
                                          <span>Sign up with google</span>
                                          <FcGoogle />
                                    </Button>
                                    <Button onclickEvent={handleLoginGithub}>
                                          <span>Sign up with GitHub</span>
                                          <BsGithub />
                                    </Button>

                                    <div className="flex items-center justify-center gap-[0.4vw] my-[0.8vw]">
                                          <div className={lineStyle}></div>
                                          <p className="uppercase text-[#e9e7ea] text-[1vw]">or</p>
                                          <div className={lineStyle}></div>
                                    </div>

                                    <Button
                                          className={`bg-blue-500! hover:bg-black! outline-[0.2vw]! outline-blue-500! text-white! hover:text-blue-500!`}
                                          onclickEvent={() => setShowModalToggler('sigin')}
                                    >
                                          Create account
                                    </Button>

                                    <p className="text-[0.6vw] text-[#71767b] mt-[1vw]">
                                          By signing up, you agree to the <span className="text-blue-700 hover:underline">Terms of Service</span> and <span className="text-blue-700 hover:underline">Privacy Policy</span>, including <span className="text-blue-700 hover:underline">Cookie Use</span>.
                                    </p>

                                    <div className="mt-[2vw]">
                                          <h3 className="text-[1.1vw] text-[#E7E9EA] font-semibold">Already have an account?</h3>

                                          <Button
                                                className={`bg-black! outline-[0.1vw]! outline-gray-600! text-white! hover:text-blue-500!`}
                                                onclickEvent={() => setShowModalToggler('login')}
                                          >
                                                Sign in
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <AuthFormModal active={showModalToggler} close={setShowModalToggler} />
            </section>
      );
}

const lineStyle = "w-full h-[0.05vw] bg-[#2f3336] mt-[0.3vw]";
