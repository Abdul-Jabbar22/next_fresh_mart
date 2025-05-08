"use client"

import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Link from "next/link"
import { CircleArrowLeft, CircleArrowRight } from "lucide-react"

const images = ["/3.jpg", "/2.jpg", "/4.jpg"]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })



  return (
    <div className="relative w-full max-w-5xl mx-auto px-2">
    <div
    ref={sliderRef}
    className="keen-slider overflow-hidden shadow-xl relative z-0 h-72 sm:h-80 md:h-96"
    style={{
      borderTopLeftRadius: "1rem",
      borderTopRightRadius: "1rem",
      clipPath: "path('M0,0 H1000 V220 Q500,320 0,220 Z')",
    }}
  >
        {images.map((src, index) => (
          <div className="keen-slider__slide relative" key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-4 z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-2 drop-shadow-lg uppercase">
                Fresh Fruits
              </h2>
              <Link href="/shop">
                <button className="bg-green-500 hover:bg-green-600text-white font-medium px-5 py-2 rounded-full shadow-md hover:scale-105 transition text-sm">
                  Shop Now
                </button>
              </Link>
            </div>

            {/* Inside arrows */}
            {loaded && (
              <>
                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition"
                  aria-label="Previous"
                >
                  <CircleArrowLeft className="text-gray w-5 h-5 cursor-pointer" />
                </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full hover:bg-white transition"
                  aria-label="Next"
                >
                  <CircleArrowRight className="text-gray w-5 h-5 cursor-pointer" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
