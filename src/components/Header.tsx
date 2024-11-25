"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../types";
import { signOut } from "next-auth/react";
import { removeUser } from "../../Redux/slices/CartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: StateProps) => state.next);

  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };

  return (
    <div className="text-sm text-white w-full h-auto bg-amazon_light p-2">
      <div className="flex items-center space-x-4 lg:space-x-6 overflow-x-scroll lg:overflow-visible">
        {/* <p className="flex items-center h-8 px-2 border font-bold text-lg border-transparent hover:border-white cursor-pointer">
          <LuMenu size="1.5em" />
          All
        </p> */}
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Amazon miniTV
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Sell
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Today&lsquo;s Deals
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Amazon Pay
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Best Sellers
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Buy Again
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Mobiles
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Customer Service
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Electronics
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Gift Cards
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          Coupons
        </p>
        <p className="inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
          New Releases
        </p>
        {userInfo && (
          <button
            onClick={handleSignOut}
            className="text-red-500 inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
