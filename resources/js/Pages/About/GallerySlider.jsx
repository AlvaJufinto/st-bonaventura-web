import { useCallback, useEffect, useState } from "react";

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

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="outer-wrapper overflow-hidden mt-10 pb-20 sm:pb-32 lg:pb-40">
      <div className="inner-wrapper px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 sm:mb-12 text-b300 font-semibold font-secondary tracking-wider uppercase text-xl sm:text-2xl">
          Gallery
        </h2>

        <div className="relative group">
          {/* Main slider container */}
          <div className="relative w-full h-64 sm:h-96 lg:h-[500px] xl:h-[600px] overflow-hidden rounded-xl bg-gray-100">
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <LazyImage
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>

            {/* Navigation arrows - always visible */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg text-gray-700 p-2 sm:p-3 rounded-full transition-all duration-200"
              aria-label="Previous image"
            >
              <img src={ChevronLeft} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg text-gray-700 p-2 sm:p-3 rounded-full transition-all duration-200"
              aria-label="Next image"
            >
              <img
                src={ChevronRight}
                alt=""
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 sm:mt-6 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-b300 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
