import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const diaryEntries = [
    {
        title: "🌞 A New Beginning",
        content: "Every sunrise brings new hope and endless possibilities. Today, I choose to embrace positivity! ✨",
      },
      {
        title: "🎯 Goal for the Day",
        content: "My focus today is self-improvement. One small step forward is still progress! 💪",
      },
      {
        title: "🌧️ Rainy Day Thoughts",
        content: "Listening to raindrops hitting my window makes me feel peaceful. Time for some cozy reading! 📖☕",
      },
      {
        title: "💡 A Brilliant Idea!",
        content: "Had an amazing thought today! If I act on it, it might change my life. No more procrastination! 🚀",
      },
      {
        title: "💬 Conversations That Matter",
        content: "Had an honest chat with someone close to me. Sometimes, words heal more than silence. ❤️",
      },
      {
        title: "📆 Flashback to a Special Moment",
        content: "Looking back at old memories, I realize how much I’ve grown. Life is truly a beautiful journey. 🌿",
      },
      {
        title: "🛤️ A Walk Through Nature",
        content: "Nature has a way of calming the mind. A simple walk outside can be the best therapy. 🍃",
      },
      {
        title: "🚀 A Step Towards My Dreams",
        content: "No dream is too big. Today, I took one step closer to making mine a reality! ✨",
      },
      {
        title: "💙 Gratitude List",
        content: "Today, I’m grateful for my health, my family, and the little joys in life. 🙏",
      },
      {
        title: "😌 Letting Go of Stress",
        content: "Breathe in, breathe out. Some things are out of my control, and that’s okay. 🌊",
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
    <div className=" flex justify-end mr-12  items-center h-[60vh] w-full">
      <div className="relative w-96 h-60 mb-5 mt-24 flex items-center">
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
                className={`w-64 h-80 bg-white rounded-2xl shadow-lg text-lg text-center flex flex-col justify-center items-center p-4 ${blur}`}
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
