import type React from "react";

interface OptionCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const OptionCheckbox: React.FC<OptionCheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-sky-500 bg-slate-600 border-slate-500 rounded focus:ring-sky-500 focus:ring-offset-slate-800"
      />
      <span className="text-slate-300">{label}</span>
    </label>
  );
};

export default OptionCheckbox;
