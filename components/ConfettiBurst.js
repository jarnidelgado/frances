// components/ConfettiBurst.js  (reemplazar)
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// carga dinámica sin SSR
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function ConfettiBurst({ fire }) {
  const [burst, setBurst] = useState(false);
  useEffect(() => {
    if (fire) {
      setBurst(true);
      const t = setTimeout(() => setBurst(false), 1800);
      return () => clearTimeout(t);
    }
  }, [fire]);
  if (!burst) return null;
  return <ReactConfetti recycle={false} numberOfPieces={140} gravity={0.3} />;
}
