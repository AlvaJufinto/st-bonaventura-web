import React, { useEffect, useState } from "react";

import Hero1 from "@/assets/img/gallery/hero-1.png";
import Hero2 from "@/assets/img/gallery/hero-2.png";
import Hero3 from "@/assets/img/gallery/hero-3.png";

const images = [Hero1, Hero2, Hero3];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[85vh] overflow-hidden bg-slate-200">
      {/* Images Container (Moves left/right) */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      <div className="bg-black h-full w-full absolute z-2 top-0 opacity-40"></div>

      <div className="absolute left-0 -translate-y-1/2 top-1/2 outer-wrapper">
        <div className="inner-wrapper !flex-row !justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-6xl text-n100">Santo Bonaventura Pulo Mas</h1>
            <p className="text-n100 text-xl font-secondary tracking-wider">
              PERJALANAN JIWA MENUJU TUHAN
            </p>
          </div>
          <p className="w-1/6 font-secondary text-n100">
            “To work up to loving God, start by loving the very humblest and
            simplest things, and then move up from there.”
          </p>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            // onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
