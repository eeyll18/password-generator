import type React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="mt-8 w-full bg-gradient-to-r from-sky-500 to-cyan-400 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md flex items-center justify-center space-x-2"
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 5px 15px rgba(14, 165, 233, 0.4)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <FiRefreshCw size={20} />
      <span>Generate New Password</span>
    </motion.button>
  );
};

export default GenerateButton;
