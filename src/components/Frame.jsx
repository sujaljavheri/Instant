

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const diaryEntries = [
  {
    title: "🌄 Morning Reflections",
    content: "Today, I woke up feeling grateful for everything around me. ☀️",
  },
  {
    title: "📖 Learning & Growth",
    content: "I read a new book on mindfulness today. It changed my perspective! 📚",
  },
  {
    title: "💖 Cherished Moments",
    content: "Had a deep conversation with an old friend. It felt like home. 🏡",
  },
];

export default function Frame() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % diaryEntries.length);
    }, 2500); // Change position every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex justify-start items-center ml-28 h-[60vh] w-full">
      <div className="relative w-96 h-60 flex justify-center items-center">
        {diaryEntries.map((entry, index) => {
          let position, blur;
          if (index === activeIndex) {
            position = "z-10 scale-110"; // Center & bigger
            blur = "opacity-100"; // Fully visible
          } else if ((index + 1) % diaryEntries.length === activeIndex) {
            position = "-translate-x-20"; // Left side
            blur = "opacity-40"; // Blurred
          } else {
            position = "translate-x-20"; // Right side
            blur = "opacity-40"; // Blurred
          }

          return (
            <motion.div
              key={index}
              className={` absolute transition-all duration-500 ease-in-out ${position}`}
            >
              <motion.div
                className={`w-64 h-70 bg-white rounded-2xl shadow-lg text-lg text-center flex flex-col justify-center items-center p-4 ${blur}`}
                animate={{ scale: index === activeIndex ? 1.2 : 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-semibold">{entry.title}</h2>
                <p className="text-gray-600 mt-2">{entry.content}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
