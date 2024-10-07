// "use client";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { HiShoppingCart } from "react-icons/hi";
// import { addToCart, addToFavourite } from "../../../Redux/slices/CartSlice";
// import { FaHeart } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// // import {useLocation} from "react-router-dom";
// const DynamicPage = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const searchParams = useSearchParams().get("image");
//   const search = useSearchParams().get("_id");
//   const imageUrl = searchParams ?? "";
//   const [product, setProduct] = useState<any>({});
//   const fetchProduct = async () => {
//     try {
//       const response = await fetch(
//         `https://fakestoreapiserver.reactbd.com/tech`
//       );
//       const data = await response.json();
//       const data1 = findobject(data);
//       console.log("DATA1:");
//       console.log(data1);
//       setProduct(data1);
//       console.log(data);
//     } catch (error) {
//       console.error("error fetching product", error);
//     }
//   };
//   function findobject(data: any) {
//     const id = search ? parseInt(search, 10) : NaN;

//     const obj = data.find((item: { _id: number }) => item._id === id);

//     return obj;
//   }
//   useEffect(() => {
//     // const fetchProduct = async () => {
//     //   try {
//     //     console.log(searchParams);
//     //     console.log("fetchproduct data is:");
//     //     const url = `https://fakestoreapiserver.reactbd.com/tech/product/${product._id}`;
//     //     console.log(url);
//     //     const response = await fetch("https://fakestoreapiserver.reactbd.com/tech/product/:id");
//     //     const data = await response.json();
//     //     setProduct(data);
//     //     console.log(data);
//     //   } catch (error) {
//     //     console.error("error fetching product", error);
//     //   }
//     // };
//     // if (imageUrl) {
//     //   fetchProduct();
//     // }
//     fetchProduct();
//   }, []);
//   //[imageUrl]
//   const handleAddToCart = () => {
//     if (!product) return;
//     dispatch(
//       addToCart({
//         _id: product._id,
//         brand: product.brand,
//         category: product.category,
//         description: product.description,
//         image: product.image,
//         isNew: product.isNew,
//         oldPrice: product.oldPrice,
//         price: product.price,
//         title: product.title,
//         quantity: 1,
//       })
//     );
//   };

//   const handleAddToFavourite = () => {
//     if (!product) return;
//     dispatch(
//       addToFavourite({
//         _id: product._id,
//         brand: product.brand,
//         category: product.category,
//         description: product.description,
//         image: product.image,
//         isNew: product.isNew,
//         oldPrice: product.oldPrice,
//         price: product.price,
//         title: product.title,
//         quantity: 1,
//       })
//     );
//   };
//   return (
//     <div className="max-w-screen-xl mx-auto px-6 py-5 md:py-10">
//       <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
//         <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
//           <Image src={imageUrl} alt="product image" width={500} height={500} />

//           <div className="w-12 h-24 absolute translate-x-20 group-hover:-translate-x-2 transition-transform duration-300 bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col">
//             <span
//               onClick={handleAddToCart}
//               className="w-full h-full border-b-[10px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
//             >
//               <HiShoppingCart />
//             </span>
//             <span
//               onClick={handleAddToFavourite}
//               className="w-full h-full border-b-[10px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
//             >
//               <FaHeart />
//             </span>
//           </div>
//         </div>
//         {product && (
//           <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
//             <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
//               {product.category}_{product.brand}
//             </p>
//             <h1 className="text-xl md:text-3xl font-semibold">
//               {product.title}
//             </h1>
//             <p className="text-sm text-gray-600">{product.description}</p>
//             <div>
//               <p className="text-base text-gray-600 flex items-center gap-1">
//                 Price:
//                 <span className="text-lg text-amazon_blue font-semibold">
//                   {product.price}
//                 </span>
//                 <span className="ml-1 line-through">{product.oldPrice}</span>
//               </p>
//               <button
//                 onClick={() =>
//                   dispatch(
//                     addToCart({
//                       _id: product._id,
//                       brand: product.brand,
//                       category: product.category,
//                       description: product.description,
//                       image: product.image,
//                       isNew: product.isNew,
//                       oldPrice: product.oldPrice,
//                       price: product.price,
//                       title: product.title,
//                       quantity: 1,
//                     })
//                   )
//                 }
//                 className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold"
//               >
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DynamicPage;


// import { addToCart, addTofavourite } from "@/store/nextSlice";
import { addToCart, addToFavourite } from "@/store/nextSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";

const DynamicPage = () => {
  const [product, setProduct] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setProduct(router.query);
  }, [router.query]);
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-4 md:py-10">
      {isLoading ? (
        <div className="w-full flex flex-col gap-6 items-center justify-center py-20">
          <p>Your product is loading...</p>
          <BeatLoader color="#131921" size={40} />
        </div>
      ) : (
        <div className="w-full grid md:grid-cols-3 gap-3 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-center bg-gray-200 rounded-lg relative group overflow-hidden">
            <Image
              src={product.image}
              alt="product image"
              width={500}
              height={500}
            />
            <div className="w-12 h-24 absolute bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col translate-x-20 group-hover:-translate-x-2 transition-transform duration-300">
              <span
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: product._id,
                      brand: product.brand,
                      category: product.category,
                      description: product.description,
                      image: product.image,
                      isNew: product.isNew,
                      oldPrice: product.oldPrice,
                      price: product.price,
                      title: product.title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <HiShoppingCart />
              </span>
              <span
                onClick={() =>
                  dispatch(
                    addToFavourite({
                      _id: product._id,
                      brand: product.brand,
                      category: product.category,
                      description: product.description,
                      image: product.image,
                      isNew: product.isNew,
                      oldPrice: product.oldPrice,
                      price: product.price,
                      title: product.title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full h-full border-b-[1px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>
          </div>
          <div className="md:col-span-2 flex flex-col gap-3 justify-center p-4">
            <p className="text-xs md:text-sm text-amazon_blue font-semibold -mb-3">
              {product.category}_{product.brand}
            </p>
            <h1 className="text-xl md:text-3xl tracking-wide font-semibold">
              {product.title}
            </h1>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div>
              <p className="text-base text-gray-600 flex items-center gap-1">
                Price:
                <span className="text-lg text-amazon_blue font-semibold">
                  {product.price}
                </span>
                <span className="ml-1 line-through">
                  {product.oldPrice}
                </span>
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Your saved:{" "}
                <span>
                  {product.oldPrice - product.price}
                </span>
              </p>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: product._id,
                      brand: product.brand,
                      category: product.category,
                      description: product.description,
                      image: product.image,
                      isNew: product.isNew,
                      oldPrice: product.oldPrice,
                      price: product.price,
                      title: product.title,
                      quantity: 1,
                    })
                  )
                }
                className="w-full md:w-96 h-12 bg-amazon_blue text-gray-200 hover:bg-amazon_yellow hover:text-amazon_blue duration-300 rounded-lg mt-5 text-base font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPage;
