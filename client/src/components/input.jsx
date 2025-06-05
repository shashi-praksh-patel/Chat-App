import React from 'react'

export default function Input({ placeholder, handleInput, name}) {
  return (
    <div>
      <input type="text" name={name} onChange={handleInput} placeholder={placeholder}  className='border-2 border-black p-2'/>
    </div>
  )
}
