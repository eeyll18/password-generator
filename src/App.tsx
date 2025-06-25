import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  calculateStrengthMetrics,
  generateNewPassword,
  type GeneratedPasswordResult,
  type GeneratePasswordOptions,
} from "./utils/passwordUtils";
import type { OptionConfig } from "./components/OptionsPanel";
import PasswordDisplay from "./components/PasswordDisplay";
import StrengthIndicator from "./components/StrengthIndicator";
import OptionsPanel from "./components/OptionsPanel";
import GenerateButton from "./components/GenerateButton";

const MIN_LENGTH = 6;
const MAX_LENGTH = 32;

function App() {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [strengthText, setStrengthText] = useState<string>("Weak");
  const [strengthColor, setStrengthColor] = useState<string>("bg-red-500");
  const [strengthValue, setStrengthValue] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleGeneratePassword = useCallback(() => {
    const options: GeneratePasswordOptions = {
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols,
    };

    const result: GeneratedPasswordResult = generateNewPassword(options);

    if (result.error) {
      setPassword("");
      setErrorMessage(result.error);
      const metrics = calculateStrengthMetrics("");
      setStrengthText(metrics.text);
      setStrengthColor(metrics.color);
      setStrengthValue(metrics.value);
    } else if (result.password) {
      setPassword(result.password);
      setErrorMessage("");
      setCopied(false);
      const metrics = calculateStrengthMetrics(result.password);
      setStrengthText(metrics.text);
      setStrengthColor(metrics.color);
      setStrengthValue(metrics.value);
    }
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const copyToClipboard = () => {
    if (password && !errorMessage) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  useEffect(() => {
    handleGeneratePassword();
  }, [handleGeneratePassword]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const optionsConfig: OptionConfig[] = [
    {
      id: "uppercase",
      label: "Uppercase (A-Z)",
      checked: includeUppercase,
      setter: setIncludeUppercase,
    },
    {
      id: "lowercase",
      label: "Lowercase (a-z)",
      checked: includeLowercase,
      setter: setIncludeLowercase,
    },
    {
      id: "numbers",
      label: "Numbers (0-9)",
      checked: includeNumbers,
      setter: setIncludeNumbers,
    },
    {
      id: "symbols",
      label: "Symbols (!@#...)",
      checked: includeSymbols,
      setter: setIncludeSymbols,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 text-slate-100 selection:bg-sky-500 selection:text-sky-900">
      <motion.div
        className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-300">
          Password Generator
        </h1>

        <div className="mb-6">
          <PasswordDisplay
            password={errorMessage || password}
            onCopy={copyToClipboard}
            isError={!!errorMessage}
          />
          <div className="h-6 text-center text-sm mt-2 relative">
            <AnimatePresence>
              {copied && !errorMessage && (
                <motion.p
                  key="copied-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className="text-sky-400 absolute inset-x-0"
                >
                  Copied!
                </motion.p>
              )}
            </AnimatePresence>
            {errorMessage && !copied && (
              <motion.p
                key="error-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400"
              >
                {errorMessage}
              </motion.p>
            )}
          </div>
        </div>
        <StrengthIndicator
          strengthText={strengthText}
          strengthColor={strengthColor}
          strengthValue={strengthValue}
        />
        <OptionsPanel
          length={length}
          setLength={setLength}
          options={optionsConfig}
          minLength={MIN_LENGTH}
          maxLength={MAX_LENGTH}
        />
        <GenerateButton onClick={handleGeneratePassword} />
      </motion.div>
    </div>
  );
}

export default App;
