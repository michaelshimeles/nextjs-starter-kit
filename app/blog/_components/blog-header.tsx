import React from 'react'

type BlogHeader = {
  title: string,
  description: string
}

export default function BlogHeader({ title, description }: BlogHeader) {
  return (
    <div className='flex flex-col items-center p-3 w-full'>
      <div className='flex flex-col justify-start items-center gap-2 w-full'>
        <div className='flex gap-3 justify-start items-center w-full'>
          <h1 className="scroll-m-20 text-3xl md:text-4xl tracking-tight font-bold text-center">
            {title}
          </h1>
        </div>
        <div className='flex gap-3 justify-start items-center w-full border-b pb-4'>
          <p className="text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
