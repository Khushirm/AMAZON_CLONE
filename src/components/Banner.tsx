"use client";

import React from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={3000}
        width="100%"
      >
        <div>
          <Image
            priority
            src="/images/caroselimg1.jpg"
            alt="asd"
            width={450}
            height={100}
            
          />
        </div>
        <div>
          <Image
            src="/images/caroselimg2.jpg"
            alt="asd"
            width={450}
            height={100}
            
          />
        </div>
        <div>
          <Image
            src="/images/caroselimg3.jpg"
            alt="asd"
            width={450}
            height={100}
           
          />
        </div>
      </Carousel>
      
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 to-transparent absolute bottom-0 z-20"></div>
    </div>
  );
};

export default Banner;
