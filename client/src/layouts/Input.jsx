import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import React, { useEffect, useState } from 'react';

export default function Input({ placeholder, name, min, max, type = 'text', className, getValue, textarea = false, defaultValue }) {
      const [focusing, setFocusing] = useState(false);
      const [value, setValue] = useState(defaultValue ? defaultValue : "");
      const [error, setError] = useState(false);
      const [showPassword, setShowPassword] = useState(false)
      const isActive = focusing || value.length > 0;

      const handleCheckValue = (e) => {
            const inputValue = e.target.value;
            if (type === 'number') {
                  const numericValue = Number(inputValue);
                  if (isNaN(numericValue) || numericValue < min || numericValue > max) {
                        setError(true);
                  } else {
                        setError(false);
                  }
            } else if (type === 'text') {
                  if (inputValue.length && (inputValue.length < min || inputValue.length > max)) {
                        setError(true);
                  } else {
                        setError(false);
                  }
            } else if (type === 'email') {
                  if (inputValue.length && (!inputValue.includes("@") || !inputValue.length)) {
                        setError(true);
                  } else {
                        setError(false);
                  }
            }
      };

      useEffect(() => { if (defaultValue) setValue(defaultValue) }, [defaultValue])

      return (
            <div
                  className={`w-full h-14 lg:h-17 py-2 px-3 grid grid-cols-1 grid-rows-[16px_100%] rounded-lg border duration-300 cursor-text overflow-hidden my-4 relative ${isActive ? 'border-blue-700' : 'border-gray-700'}
                         ${error && 'border-red-700!'} ${className}`}
            >
                  <label
                        htmlFor={`${placeholder}-${name}`}
                        className={`${isActive ? 'text-blue-700 text-sm' : 'text-gray-700 text-md lg:text-xl pt-2'} ${error && 'text-red-700!'} cursor-text capitalize font-light duration-300 h-min!`}
                  >
                        {placeholder}
                  </label>
                  {/* show password */}
                  <button className={`absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer text-lg sm:text-xl lg:text-2xl ${showPassword ? "text-blue-500" : 'text-white'}`} onClick={(e) => { setShowPassword(prev => !prev); e.preventDefault() }}>{type === 'password' && (showPassword ? <FaEye /> : <FaEyeSlash />)}</button>
                  {/* input */}
                  {
                        textarea ?
                              <textarea id={`${placeholder}-${name}`}
                                    name={name}
                                    type={type === 'password' ? (showPassword ? "text" : "password") : type}
                                    value={value}
                                    onFocus={() => setFocusing(true)}
                                    onBlur={() => setFocusing(false)}
                                    onChange={(e) => {
                                          setValue(e.target.value);
                                          handleCheckValue(e);
                                          getValue && getValue(e.target.value)
                                    }}
                                    className={`text-white h-full text-xs outline-0 resize-none`}
                                    aria-valuemin={min}
                                    aria-valuemax={max}
                              >
                              </textarea> :
                              <input
                                    id={`${placeholder}-${name}`}
                                    name={name}
                                    type={type === 'password' ? (showPassword ? "text" : "password") : type}
                                    value={value}
                                    onFocus={() => setFocusing(true)}
                                    onBlur={() => setFocusing(false)}
                                    onChange={(e) => {
                                          setValue(e.target.value);
                                          handleCheckValue(e);
                                          getValue && getValue(e.target.value)
                                    }}
                                    className={`text-white text-xs outline-0 ${name !== "email" && 'capitalize'}`}
                                    aria-valuemin={min}
                                    aria-valuemax={max}
                              />

                  }
            </div>
      );
}
