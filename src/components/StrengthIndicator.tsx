import type React from "react";
import { motion } from "framer-motion";

interface StrengthIndicatorProps {
  strengthText: string;
  strengthColor: string;
  strengthValue: number;
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({
  strengthText,
  strengthColor,
  strengthValue,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center text-sm mb-1">
        <span className="text-slate-400">Şifre Gücü:</span>
        <span
          className={`font-semibold ${strengthColor.replace("bg-", "text-")}`}
        >
          {strengthText}
        </span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className={`h-2.5 rounded-full ${strengthColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${strengthValue}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

export default StrengthIndicator;
