import React, { useEffect, useState } from "react";

import Hero1 from "@/assets/img/gallery/hero-1.png";
import Hero2 from "@/assets/img/gallery/hero-2.png";
import Hero3 from "@/assets/img/gallery/hero-3.png";
import LazyImage from "@/Components/guest/LazyImage";

const images = [Hero1, Hero2, Hero3];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-200">
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <LazyImage key={index} src={image} alt={`Slide ${index + 1}`} />
        ))}
      </div>

      <div className="bg-black h-full w-full absolute z-2 top-0 opacity-40"></div>

      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 outer-wrapper">
        <div className="inner-wrapper !flex-col lg:!flex-row !justify-center lg:!justify-between !items-center gap-6 lg:gap-0">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-n100">
              Santo Bonaventura Pulo Mas
            </h1>
            <p className="text-n100 text-lg sm:text-xl font-secondary tracking-wider">
              PERJALANAN JIWA MENUJU TUHAN
            </p>
          </div>
          <p className="w-full lg:w-1/6 italic font-secondary text-n100 text-center lg:text-left text-sm sm:text-base">
            "To work up to loving God, start by loving the very humblest and
            simplest things, and then move up from there."
          </p>
        </div>
      </div>

      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
