import type React from "react";

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
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${strengthColor}`}
          style={{ width: `${strengthValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StrengthIndicator;
