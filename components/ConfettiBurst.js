// components/ConfettiBurst.js
import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";

export default function ConfettiBurst({ fire }) {
  const [burst, setBurst] = useState(false);
  useEffect(()=> {
    if(fire){
      setBurst(true);
      const t = setTimeout(()=> setBurst(false), 1800);
      return ()=> clearTimeout(t);
    }
  },[fire]);
  if(!burst) return null;
  // full-screen confetti
  return <ReactConfetti recycle={false} numberOfPieces={140} gravity={0.3} />;
}
