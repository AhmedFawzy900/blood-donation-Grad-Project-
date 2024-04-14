import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "react-toastify/dist/ReactToastify.css";

// Import Swiper styles
import "swiper/css";
import { Bounce, Slide, ToastContainer, Zoom, toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
    toast.success(`welcom ${currentUser.name}`, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
    });
  }, []);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const emailAddress = currentUser.email;
  if (!currentUser) {
    navigate("/");
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  const handleBloodRequest = () => {
    navigate("/bloodRequst");
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      <Slider />
      <h1>Home</h1>
      <h2>welcom {currentUser.name}</h2>
    </div>
  );
}
