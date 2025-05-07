import React, { useState } from 'react';

export default function Input({ placeholder, name, min, max, type = 'text', className }) {
      const [focusing, setFocusing] = useState(false);
      const [value, setValue] = useState('');
      const [error, setError] = useState(false);
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
                  className={`w-full h-17 py-2 px-3 grid grid-cols-1 rounded-lg border duration-300 cursor-text overflow-hidden my-4 ${isActive ? 'border-blue-700' : 'border-gray-700'}
                        } ${error && 'border-red-700!'} ${className}`}
            >
                  <label
                        htmlFor={`${placeholder}-${name}`}
                        className={`${isActive ? 'text-blue-700 text-sm' : 'text-gray-700 text-xl pt-2'} ${error && 'text-red-700!'} cursor-text capitalize font-light duration-300`}
                  >
                        {placeholder}
                  </label>
                  <input
                        id={`${placeholder}-${name}`}
                        name={name}
                        type={type}
                        value={value}
                        onFocus={() => setFocusing(true)}
                        onBlur={() => setFocusing(false)}
                        onChange={(e) => {
                              setValue(e.target.value);
                              handleCheckValue(e);
                        }}
                        className={`outline-0 ${name !== "email" && 'capitalize'}`}
                        aria-valuemin={min}
                        aria-valuemax={max}
                  />
            </div>
      );
}
