"use client";
import React from "react";
import { ProductProps } from "../../types";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, addToFavourite } from "../../Redux/slices/CartSlice";
import Link from "next/link";

const Products: React.FC<ProductProps> = ({ productData }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex flex-wrap justify-center items-center p-2">
      {productData.map((product) => (
      
        <div
          className="w-full md:w-1/2 xl:w-1/4 p-2 m-6 bg-white text-black border border-gray-300  rounded-lg group overflow-hidden"
          key={product._id} 
        >
           
          <div className="w-full h-[260px] relative p-4">
            <Link href={{pathname:`/${product._id}`,query:{
              _id: product._id,
              brand: product.brand,
              category: product.category,
              description: product.description,
              image: product.image,
              isNew: product.isNew,
              oldPrice: product.oldPrice,
              price: product.price,
              title: product.title,
            }}}>
            <Image
              className="w-full h-full object-cover scale-90 hover:scale-100 transition-transform duration-300"
              width={300}
              height={300}
             src={product.image}
              alt="productImage"
            />
            </Link>
           
            <div className="w-12 h-24 absolute translate-x-20 group-hover:translate-x-0 bottom-10 right-0 border-[1px] border-gray-400 bg-white rounded-md flex flex-col">
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
                className="w-full h-full border-b-[10px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
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
                className="w-full h-full border-b-[10px] border-b-gray-400 flex items-center justify-center text-xl bg-transparent hover:bg-amazon_yellow cursor-pointer duration-300"
              >
                <FaHeart />
              </span>
            </div>
            {product.isNew && (
              <p className="absolute top-0 right-0 text-amazon_blue font-medium text-xs animate-bounce">
                Save {product.oldPrice - product.price}
              </p>
            )}
          </div>
          <hr />
          <div className="px-4 py-3 flex flex-col gap-1">
            <p className="text-xs text-gray-500 ">{product.category}</p>
            <p className="font-medium text-base">{product.title}</p>
            <p className="flex items-center gap-2">
              <span className="text-sm line-through">{product.oldPrice}</span>
              <span className="text-amazon_blue font-semibold">
                {product.price}
              </span>
            </p>
            <p className="text-xs text-gray-600 text-justify line-clamp-4">
              {product.description}
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
              className="font-medium h-10 bg-amazon_blue text-white rounded-2xl hover:bg-amazon_yellow hover:text-black duration-300 mt-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
