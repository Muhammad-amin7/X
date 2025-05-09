import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import React, { useState } from 'react';

export default function Input({ placeholder, name, min, max, type = 'text', className, getValue }) {
      const [focusing, setFocusing] = useState(false);
      const [value, setValue] = useState('');
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

      return (
            <div
                  className={`w-full h-17 py-2 px-3 grid grid-cols-1 rounded-lg border duration-300 cursor-text overflow-hidden my-4 relative ${isActive ? 'border-blue-700' : 'border-gray-700'}
                        } ${error && 'border-red-700!'} ${className}`}
            >
                  <label
                        htmlFor={`${placeholder}-${name}`}
                        className={`${isActive ? 'text-blue-700 text-sm' : 'text-gray-700 text-xl pt-2'} ${error && 'text-red-700!'} cursor-text capitalize font-light duration-300 `}
                  >
                        {placeholder}
                  </label>
                  <button className={`absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer text-2xl ${showPassword ? "text-blue-500" : 'text-white'}`} onClick={(e) => { setShowPassword(prev => !prev); e.preventDefault() }}>{type === 'password' && (showPassword ? <FaEye /> : <FaEyeSlash />)}</button>
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
                        className={`outline-0 ${name !== "email" && 'capitalize'}`}
                        aria-valuemin={min}
                        aria-valuemax={max}
                  />
            </div>
      );
}
