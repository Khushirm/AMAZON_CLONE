"use client";
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';
import { resetCart } from '../../../Redux/slices/CartSlice';


const Successpage = () => {
    const dispatch= useDispatch();
  return (
    <div className='flex flex-col py-20 gap-2 justify-center items-center'>
<h1 className='font-semibold text-2xl'>Thank You for Shopping in Amazon Clone.</h1>
<Link href={'/'} onClick={()=>dispatch(resetCart())}>
    <p>Continue Shopping</p>
</Link>
    </div>
  )
}

export default Successpage;