import Particles from "../components/Particles";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Landing() {
  const navigate = useNavigate();

  // THRUST  in multiple scripts
  const words = [
    "THRUST",
    "थ्रस्ट",
    "థ్రస్ట్",
    "த்ரஸ்ட்",
    "ತ್ರಸ್ಟ್",
    "ത്രസ്റ്റ്",
    "থ্রাস্ট",
    "થ્રસ્ટ",
    "ਥ੍ਰਸਟ"
  ];

  
  const fonts = [
    "Montage",                // English futuristic
    "Noto Sans Devanagari",    // Hindi
    "Noto Sans Telugu",        // Telugu
    "Noto Sans Tamil",         // Tamil
    "Noto Sans Kannada",       // Kannada
    "Noto Sans Malayalam",     // Malayalam
    "Noto Sans Bengali",       // Bengali
    "Noto Sans Gujarati",      // Gujarati
    "Noto Sans Gurmukhi"       // Punjabi
  ];

  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="relative h-screen flex flex-col items-center justify-center text-white overflow-hidden">

      {/* Particle background */}
      <Particles />
      

      
      <div className="z-10 h-40 flex items-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            initial={{ opacity: 0, y: 60, filter: "blur(14px)", scale: 0.9 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, y: -60, filter: "blur(14px)", scale: 0.9 }}
            transition={{ duration: 1 }}
            className="text-10xl md:text-8xl font-bold text-center"
            style={{
              fontFamily: fonts[index],
              letterSpacing: "0.22em",
              textShadow: "0 0 50px rgba(255,255,255,0.95)"
            }}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

     
      <motion.button
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{
          scale: 1,
          boxShadow: "0 0 40px rgba(255,255,255,0.9)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/mode-selection")}
        className="mt-14 px-3 py-3 rounded-2xl font-semibold text-lg z-10"
        style={{
          background: "linear-gradient(135deg,#ffffff,#d9d9d9)",
          color: "#000",
          fontFamily: "Cinzel",
          letterSpacing: "0.08em"
        }}
      >
        let's start
      </motion.button>

    </div>
    
  );
}
