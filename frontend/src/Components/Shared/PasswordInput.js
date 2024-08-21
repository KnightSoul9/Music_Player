import React from 'react'

function PasswordInput({ label, placeholder, className, value, setValue }) {
    return (
        <div className={`flex flex-col space-y-2 w-full ${className}`}>
            <label for={label} className='font-bold'>
                {label}
            </label>
            <input
                type='password'
                placeholder={placeholder}
                className='p-2 border border-black border-solid rounded placeholder-gray-600'
                id={label}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
            />


        </div>
    )

}

export default PasswordInput