"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = [
  "/3.jpg",
  "/2.jpg",
//   "/images/slider2.jpg",
//   "/images/slider3.jpg",
];

export default function HeroSlider() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider rounded-xl overflow-hidden mb-6 shadow-lg">
      {images.map((src, index) => (
        <div className="keen-slider__slide" key={index}>
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-[400px] object-cover" />
        </div>
      ))}
    </div>
  );
}
