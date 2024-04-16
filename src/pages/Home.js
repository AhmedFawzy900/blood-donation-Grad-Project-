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
import WelcomeSection from "../components/WelcomeSection";
import WhyToDonateSection from "../components/WhyToDonateSection";
import OurStatesSection from "../components/OurStatesSection";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate();
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
      <Navbar />
      <WelcomeSection />
      <WhyToDonateSection />
      <OurStatesSection />
    </div>
  );
}
