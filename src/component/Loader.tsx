// components/Loader.tsx
"use client";

import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <ClipLoader size={50} color="#16a34a" /> {/* Tailwind green-600 */}
    </div>
  );
}
