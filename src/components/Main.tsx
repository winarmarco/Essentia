"use client";

import React, {Fragment} from "react";
import Image from "next/image";
import sofaPic from "../../public/image-40.jpg";
import "./module.carousel.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import Head from "next/head";
import LandingCarousel from "./LandingCarousel/LandingCarousel";



const Main = () => {
  return (
    <div className="relative flex-grow">
      <LandingCarousel />
    </div>
  );
};

export default Main;
