import type React from "react";
import PasswordLengthSlider from "./PasswordLengthSlider";
import OptionCheckbox from "./OptionCheckbox";

export interface OptionConfig {
  id: string;
  label: string;
  checked: boolean;
  setter: (value: boolean) => void;
}

interface OptionsPanelProps {
  length: number;
  setLength: (value: number) => void;
  options: OptionConfig[];
  minLength?: number;
  maxLength?: number;
}

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  length,
  setLength,
  options,
  minLength,
  maxLength,
}) => {
  return (
    <div className="space-y-5">
      <PasswordLengthSlider
        length={length}
        onChange={setLength}
        minLength={minLength}
        maxLength={maxLength}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <OptionCheckbox
            key={option.id}
            id={option.id}
            label={option.label}
            checked={option.checked}
            onChange={option.setter}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionsPanel;
