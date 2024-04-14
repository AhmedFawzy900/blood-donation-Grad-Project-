import React, { useRef, useState } from "react";

// Import Swiper styles
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import slideImg1 from "../images/SliderImg1.png";
import slideImg2 from "../images/blood1.jpeg";
import slideImg3 from "../images/blood2.png";
import slideImg4 from "../images/blood3.png";
export default function Slider() {
  return (
    <div className="my-5">
      <Swiper
        className="mySwiper container"
        spaceBetween={30}
        centeredSlides
        autoplay={{ delay: 1000 }} // Specify the delay in milliseconds
        pagination={{ clickable: true }} // Enable clickable pagination
        autoHeight
      >
        <SwiperSlide>
          <img src={slideImg1} alt="" className="img1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg3} alt="" className="img2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slideImg4} alt="" className="img3" />
        </SwiperSlide>
        

      </Swiper>
    </div>
  );
}
