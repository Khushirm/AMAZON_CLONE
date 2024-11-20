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

// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { resetCart } from "../../../../Redux/slices/CartSlice";
// import { useParams} from "next/navigation";
// import Image from "next/image";
  
//   const Successpage = () => {
//     const dispatch = useDispatch();
//     const [orderDetails, setOrderDetails] = useState<any>(null);
    
//     const params = useParams();

//   useEffect(() => {
//     if (!params) {
//         console.error("Params is null or undefined");
//         return;
//       }
//     const fetchOrderDetails = async () => {
//         const orderId = params?.orderId;
//         if (!orderId) return <p>Invalid Order ID</p>;
//       try {
//         const response = await fetch(
//           `/api/get-order-details?orderId=${orderId}`
//         );
//         const data = await response.json();
//         console.log("Order Details Data:", data);

//         setOrderDetails(data);

//         if (data && data.status === "paid") {
//           dispatch(resetCart()); 
//         }
//       } catch (error) {
//         console.error("Error fetching order details:", error);
//       }
//     };

//     fetchOrderDetails();
//   }, [params,dispatch]);

//   return (
//     <div className="flex flex-col py-20 gap-2 justify-center items-center">
//       <h1 className="font-semibold text-2xl">
//         Thank You for Shopping in Amazon Clone.
//       </h1>
//       {orderDetails ? ( 
//         <>
//       <p>Order ID: {orderDetails.orderId}</p>
//       <p>Total Amount: ₹{orderDetails.totalAmount / 100}</p>
//       <p>Status: {orderDetails.status}</p>
//       {orderDetails.image ? (
//             <Image
//             src={orderDetails.image || "/images/amazon-logo.png"}
//             alt="Product Image"
//             className="w-32 h-32 mt-4"
//           />
//         ) : (
//           <p>No image available</p>
//         )}
//       </>
//     ) : (
//       <p>Loading order details...</p>
//     )}
//       <Link href="/" >
//         <button className="mt-4 p-2 bg-blue-500 text-white rounded">
//           Continue Shopping
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Successpage;
