import React from "react";
import { FiCopy } from "react-icons/fi";

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
  return (
    <div className="relative bg-slate-700 p-4 rounded-lg flex items-center justify-between">
      <input
        type="text"
        value={password}
        readOnly
        placeholder="Şifreniz.."
        className={`w-full text-xl md:text-2xl font-mono truncate bg-transparent outline-none ${
          isError ? "text-red-400 placeholder-red-400/70" : "text-slate-50"
        }`}
      />
      <button
        onClick={onCopy}
        disabled={isError || !password}
        title="Şifreyi Kopyala"
        className="p-2 text-slate-400 hover:text-sky-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiCopy size={24} />
      </button>
    </div>
  );
};

export default PasswordDisplay;
