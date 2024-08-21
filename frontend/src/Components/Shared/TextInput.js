 import React from 'react'
 
 function TextInput({label,placeholder,className,value,setValue,labelClassName}) {
   return ( 
     <div className={`flex flex-col space-y-2 w-full ${labelClassName}`}>
        <label for={label} className={`font-semibold ${labelClassName}`}>
            {label}
        </label>
        <input 
            type='text'
            placeholder={placeholder}
            className='p-3 border border-black border-solid rounded placeholder-gray-600'
            id={label}
            value={value}
            onChange={(e)=>{
              setValue(e.target.value)
            }}
        />

        
     </div>
   ) 
 }
 
 export default TextInput