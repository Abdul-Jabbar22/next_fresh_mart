import HeroSection from "@/component/HeroSection";
import HeroSlider from "@/component/HeroSlider";

export default async function Home() {
  return (
    <>
      <div className="p-6 text-center w-full bg-gray-50">
        <HeroSlider />

        <HeroSection />
      </div>
    </>
  );
}
