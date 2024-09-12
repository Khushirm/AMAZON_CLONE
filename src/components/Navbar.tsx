"use client";
import Image from "next/image";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { BiCart } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "../../types";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { addUser } from "../../Redux/slices/CartSlice";

const Navbar = () => {
  const { data: session } = useSession();
  const { productData, favouriteData, userInfo } = useSelector(
    (state: StateProps) => state.next
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (session) {
      dispatch(
        addUser({
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image,
        })
      );
    }
  }, [session]);
  return (
    <div className="w-full h-16 bg-amazon_blue text-lightText sticky top-0 z-50">
      <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4">
        <Link
          href={"/"}
          className="border border-transparent hover:border-white h-[70%] cursor-pointer flex justify-center"
        >
          <Image
            className="p-1.5"
            src="/images/amazon-logo.png"
            width={100}
            height={70}
            alt="Logo"
          />
        </Link>
        <div className="text-xs px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex flex-col items-center justify-center h-[70%]">
          <p>Delivering To</p>
          <div className="flex">
            <SlLocationPin size="1.3em" color="white" />
            <p className="text-white font-bold">INDIA</p>
          </div>
        </div>
        <div className="flex-1 h-10 items-center justify-between inline-flex relative">
          <span className="h-full ml-0 text-black text-sm flex absolute">
            <select className="bg-gray-300 rounded-tl-md rounded-bl-md w-10">
              <option value="someOption">All</option>
              <option value="otherOption">Other option</option>
            </select>
          </span>
          <input
            className="w-full h-full ml-8 rounded-md px-2 text-black border-[3px]"
            type="text"
            placeholder="Search Amazon.in"
          />
          <span className="w-10 h-full bg-amazon_yellow text-black text-2xl flex items-center justify-center absolute right-0 rounded-tr-md rounded-br-md">
            <HiOutlineSearch />
          </span>
        </div>

        <div className="text-xs px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
          <Image
            className="p-1.5"
            src="/images/flag.jpg"
            width={40}
            height={10}
            alt="Logo"
          />
          <select className="bg-amazon_blue text-white">
            <option value="en">EN</option>
            <option value="en">HI</option>
            <option value="en">TE</option>
            <option value="en">CI</option>
          </select>
        </div>
        {userInfo ? (
          <div className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%] gap-1">
            <img src={userInfo.image} alt="userImage" className="w-8 h-8 rounded-full object-cover" />
            <div className="text-xs text-gray-100 flex flex-col justify-between">
              <p className="text-white font-bold">{userInfo.name}</p>
              <p>{userInfo.email}</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => signIn()}
            className="text-xs text-gray-200 flex flex-col px-2 border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%]"
          >
            <p>Hello,sign in</p>
            <p className="text-white font-bold flex items-center">
              Account & Lists{" "}
              <span>
                <BiCaretDown />
              </span>
            </p>
          </div>
        )}
        <Link href={"/favourite"} className="text-xs text-gray-200 flex flex-col px-1 justify-center border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
          <p>Marked</p>
          <p className="text-white font-bold">& Favourite</p>
          {favouriteData.length > 0 && (
            <span className="absolute right-2 top-2 w-4 h-4 border-[1px] border-gray-400 flex items-center justify-center text-xs text-amazon_yellow">
              {favouriteData.length}
            </span>
          )}
        </Link>

        <Link
          href={"/cart"}
          className="flex items-center px-1 text-xs border border-transparent hover:border-white cursor-pointer duration-300 justify-center h-[70%]"
        >
          <BiCart size="3em" />
          <span>
            <p className="text-white font-bold text-sm">Cart</p>
            {productData ? productData.length : 0}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

