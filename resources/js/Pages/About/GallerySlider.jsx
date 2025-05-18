import { useEffect, useState } from "react";

import ChevronLeft from "@/assets/icon/chevron-left.svg";
import ChevronRight from "@/assets/icon/chevron-right.svg";
import Hero1 from "@/assets/img/gallery/hero-1.png";
import Hero2 from "@/assets/img/gallery/hero-2.png";
import Hero3 from "@/assets/img/gallery/hero-3.png";
import Hero4 from "@/assets/img/gallery/hero-4.png";
import LazyImage from "@/Components/guest/LazyImage";

const images = [Hero1, Hero2, Hero3, Hero4];

export default function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide changes every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]); // Re-run when currentIndex changes

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="outer-wrapper overflow-hidden pb-40">
      <div className="inner-wrapper">
        <h1 className="my-10 text-b300 font-semibold flex items-center gap-2 font-secondary tracking-wider uppercase text-2xl">
          Gallery
        </h1>

        {/* Slider Container */}
        <div className="relative w-full h-[600px] overflow-hidden">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <LazyImage
                key={index}
                src={image}
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
            onClick={prevSlide}
          >
            <img className="cursor-pointer" src={ChevronLeft} alt="" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
            onClick={nextSlide}
          >
            <img className="cursor-pointer" src={ChevronRight} alt="" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
