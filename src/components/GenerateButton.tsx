import type React from "react";
import { FiRefreshCw } from "react-icons/fi";

interface GenerateButtonProps {
  onClick: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-8 w-full bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
    >
      <FiRefreshCw size={20} />
      <span>Yeni Şifre Oluştur</span>
    </button>
  );
};

export default GenerateButton;
