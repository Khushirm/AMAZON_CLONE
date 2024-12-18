"use client"
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { StateProps, StoreProduct } from "../../../types";
import FavouriteProduct from "@/components/FavouriteProduct";
import ResetFavouriteItems from "@/components/ResetFavouriteItems";

const FavouritePage = () => {
  const { favouriteData } = useSelector((state: StateProps) => state.next);
  console.log("Favourite Data:", favouriteData);
  return (
    <div className="max-w-screen-xl mx-auto px-6 gap-10 py-4">
      {favouriteData.length > 0 ? (
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-400 pb-1">
            <p className="text-2xl font-semibold text-amazon_blue">
              Favourite Items
            </p>
            <p className="text-lg font-semibold text-amazon_blue">Action</p>
          </div>
          <div>
            {favouriteData.map((item: StoreProduct, index:number) => (
              <div key={item._id || index} className="mt-2">
                <FavouriteProduct item={item} />
              </div>
            ))}
            <ResetFavouriteItems />
          </div>
        </div>
      ) : (
        <div className="bg-white h-96 text-black flex flex-col items-center justify-center py-5 rounded-lg shadow-lg">
          <h1>Nothing is available in the Favourite list</h1>
          <Link href="/">
            <button className="w-52 h-10 bg-amazon_blue text-white rounded-lg text-sm font-semibold hover:bg-amazon_yellow hover:text-black duration-300 mt-2">
              Go to Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
