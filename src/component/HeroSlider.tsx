"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
const images = [
  "/3.jpg",
  "/2.jpg",
  "/4.jpg",
];

export default function HeroSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  return (
    <div
      ref={sliderRef}
      className="keen-slider rounded-xl overflow-hidden mb-6 shadow-lg relative z-0"
    >
      {images.map((src, index) => (
        <div className="keen-slider__slide relative" key={index}>
          {/* Background image */}
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-[400px] object-cover"
          />

          {/* Text overlay */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white z-10 px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">
              Fresh & Organic
            </h2>
            <p className="text-sm md:text-lg mb-4 drop-shadow-sm max-w-xl">
              Delivered to your doorstep. Eat healthy, live better!
            </p>
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition shadow-md">
            <Link href="/shop" >
            Shop noW
          </Link>
            </button>
            <p className="mt-4 text-white">
        Buy the freshest fruits and vegetables online.
      </p>
          </div>
        </div>
      ))}
    </div>
  );
}
