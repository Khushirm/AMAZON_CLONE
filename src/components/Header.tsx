"use client";
import React from "react";
import { LuMenu } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../types";
import { signOut } from "next-auth/react";
import { removeUser } from "../../Redux/slices/CartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state:StateProps)=> state.next);
  const handleSignOut = () => {
    signOut();
    dispatch(removeUser());
  };
  return (
    <div className="text-sm text-white w-full h-10 bg-amazon_light p-2 flex items-center">
      <p className="flex items-center h-8 px-2 border font-bold text-lg border-transparent hover:border-white cursor-pointer">
        <LuMenu size="1.5em" />
        All
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Amazon miniTV
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Sell
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Today&lsquo;s Deals
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Amazon Pay
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Best Sellers
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Buy Again
      </p>
      <p className=" md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Mobiles
      </p>
      {/* <select className="w-16 bg-amazon_light border border-transparent hover:border-white cursor-pointer">
        <option value="someOption">Prime</option>
        <option value="someOption">Prime Flyout</option>
      </select> */}
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Customer Service
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
      Electronics
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Gift Cards
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Coupons
      </p>
      <p className="md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        New Releases
      </p>
      {userInfo && (
      <button onClick={handleSignOut} className="hidden text-red-500 md:inline-flex items-center h-8 px-2 border border-transparent hover:border-white cursor-pointer">
        Sign Out
      </button>
      )}
    </div>
  );
};

export default Header;
