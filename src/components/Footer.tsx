import React from 'react'
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='w-full h-24 bg-amazon_light text-gray-300 flex items-center justify-center gap-3'>
        <Image src="/images/amazon-logo.png" alt="logo" width={52} height={8}/>
        <p className='text-sm -mt-2'>All rights reserved <a className='hover:text-white hover:underline decoration-[1px] cursor-pointer' href="https://www.amazon.in/" target="_blank">amazon</a></p>
    </div>
  )
}

export default Footer;