"use client";
import React from 'react'
import { resetCart } from '../../Redux/slices/CartSlice';
import { useDispatch } from 'react-redux';

const ResetCart = () => {
  const dispatch =  useDispatch();
  const handleResetCart = ()=>{
    const confirmReset = window.confirm(
      "are you sure to reset items in cart?"
    );
    if(confirmReset){
      dispatch(resetCart());
    }
  };
  return (
    <button onClick={handleResetCart} className='w-44 h-10 font-semibold bg-gray-200 rounded-lg hover:bg-red-600 hover:text-white duration-300'>Reset Cart</button>
  )
}

export default ResetCart;