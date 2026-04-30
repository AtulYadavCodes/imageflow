import React from 'react'
import image from "../../assets/architecture.png"
import image2 from "../../assets/archhigh.png"
function ArchitectureSection() {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12 '>
     <div className='border-2 border-zinc-700  p-5'>
         <p className='text-2xl font-semibold font-mono m-4 block'>Architecture diagram- highlevel</p> 
         <img className='border-1 p-10' src={image2}/>
          <p className='text-2xl font-semibold font-mono m-4 block'>Architecture diagram- detailed</p> 
      <img className='border-1 p-10' src={image}/>
      </div>
    </div>
  )
}

export default ArchitectureSection