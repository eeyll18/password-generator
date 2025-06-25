import React from "react";
import { FiCopy } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface PasswordDisplayProps {
  password: string;
  onCopy: () => void;
  isError: boolean;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  onCopy,
  isError,
}) => {
  const inputVariants = {
    initial: { opacity: 0.8, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="relative bg-slate-700 p-4 rounded-lg flex items-center justify-between shadow-lg"
      initial="hidden"
      animate="visible"
    >
      <motion.input
        key={password}
        type="text"
        value={password}
        readOnly
        placeholder="Your Password.."
        variants={inputVariants}
        initial="initial"
        animate="animate"
        className={`w-full text-xl md:text-2xl font-mono truncate bg-transparent outline-none ${
          isError ? "text-red-400 placeholder-red-400/70" : "text-slate-50"
        }`}
      />
      <motion.button
        onClick={onCopy}
        disabled={isError || !password}
        transition={{ duration: 0.15 }}
        className="p-2 text-slate-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key="copy"
            initial={{ scale: 0.5, opacity: 0, rotate: 90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            <FiCopy size={24} />
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export default PasswordDisplay;
