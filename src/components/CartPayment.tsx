// "use client";
// import { SiMediamarkt } from "react-icons/si";
// import { useSelector } from "react-redux";
// import { StateProps, StoreProduct } from "../../types";
// import { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { useSession } from "next-auth/react";


// const CartPayment = () => {
//   const { productData, userInfo } = useSelector(
//     (state: StateProps) => state.next
//   );
//   const [totalAmount, setTotalAmount] = useState(0);
//   useEffect(() => {
//     let amt = 0;
//     productData?.map((item: StoreProduct) => {
//       amt += item.price * item.quantity;
//       return;
//     });
//     setTotalAmount(amt);
//   }, [productData]);
//   const stripePromise = loadStripe(
//     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
//   );
//   const {data:session} = useSession();
//   const handleCheckout=async()=>{
//    const stripe =await stripePromise;
//    const response = await fetch("/api/checkout",{
//     method:"POST",
//     headers:{
//       "Content-Type":"application/json",
//     },
//     body:JSON.stringify({items:productData,email:session?.user?.email}),
//    });
//    if (!response.ok) {
//     console.error(`Error: ${response.statusText}`);
//     return;
//   }
//    const checkoutSession = await response.json();
//    console.log(checkoutSession);
//    const result:any = await stripe?.redirectToCheckout({
//     sessionId: checkoutSession.sessionid,
//    });
//    if(result.error){
//     alert(result?.error.message);
//    }
//   };
//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex gap-2">
//         <span className="bg-green-600 p-1 text-sm h-6 flex items-center justify-center mt-1 rounded-full w-6 text-white">
//           <SiMediamarkt />
//         </span>
//         <p className="text-sm text-red-500">FREE SHIPPING ||CHECKOUT|| See Details...</p>
//       </div>
//       <p className="flex items-center justify-center px-2 font-semibold">
//         Total Amount: <span className="font-bold text-xl">{totalAmount}</span>
//       </p>
//       {userInfo ? (
//         <div className="flex flex-col items-center">
//           <button onClick={handleCheckout} className="text-sm font-semibold w-full h-10 bg-amazon_blue bg-opacity-50 text-white rounded-lg hover:bg-green-600">
//             Proceed to Buy
//           </button>
          
//         </div>
//       ) : (
//         <div className="flex flex-col items-center">
//           <button className="text-sm font-semibold w-full h-10 bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed">
//             Proceed to Buy
//           </button>
//           <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
//             Please login to continue
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPayment;

"use client";
import { SiMediamarkt } from "react-icons/si";
import { useSelector } from "react-redux";
import { StateProps, StoreProduct } from "../../types";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartPayment = () => {
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    setTotalAmount(
      productData?.reduce((amt:number, item:StoreProduct) => amt + item.price * item.quantity, 0) || 0
    );
  }, [productData]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe not loaded");
      return;
    }

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: productData, email: session?.user?.email }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      return;
    }

    const checkoutSession = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.sessionid,
    });

    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="bg-green-600 p-1 text-sm h-6 flex items-center justify-center mt-1 rounded-full w-6 text-white">
          <SiMediamarkt />
        </span>
        <p className="text-sm text-red-500">FREE SHIPPING ||CHECKOUT|| See Details...</p>
      </div>
      <p className="flex items-center justify-center px-2 font-semibold">
        Total Amount: <span className="font-bold text-xl">{totalAmount}</span>
      </p>
      {userInfo ? (
        <button
          onClick={handleCheckout}
          className="text-sm font-semibold w-full h-10 bg-amazon_blue bg-opacity-50 text-white rounded-lg hover:bg-green-600"
        >
          Proceed to Buy
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <button
            disabled
            className="text-sm font-semibold w-full h-10 bg-amazon_blue bg-opacity-50 text-white rounded-lg cursor-not-allowed"
          >
            Proceed to Buy
          </button>
          <p className="text-xs mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default CartPayment;
