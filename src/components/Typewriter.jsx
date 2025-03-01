import { motion } from "framer-motion";

const sentence = "Get Connect with Us And With Your Dairy Instant";

const TypewriterEffect = () => {
    return (
        <motion.h1 
            className="text-3xl text-slate-700 font-bold"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
        >
            {sentence.split("").map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }} 
                >
                    {char}
                </motion.span>
            ))}
        </motion.h1>
    );
};

export default TypewriterEffect;
