import type React from "react";

interface PasswordLengthSliderProps {
  length: number;
  minLength?: number;
  maxLength?: number;
  onChange: (value: number) => void;
}

const PasswordLengthSlider: React.FC<PasswordLengthSliderProps> = ({
  length,
  minLength = 6,
  maxLength = 32,
  onChange,
}) => {
  return (
    <div>
      <label
        htmlFor="length"
        className="block text-sm font-medium text-slate-300 mb-1"
      >
        Şifre Uzunluğu:{" "}
        <span className="font-semibold text-sky-400">{length}</span>
      </label>
      <input
        type="range"
        value={length}
        id="length"
        min={minLength}
        max={maxLength}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
      />
    </div>
  );
};

export default PasswordLengthSlider;
