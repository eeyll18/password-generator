import { describe, it, expect } from "vitest";
import {
  calculateStrengthMetrics,
  generateNewPassword,
  type GeneratePasswordOptions,
  type StrengthMetrics,
  uppercaseChars,
  symbolChars,
} from "../utils/passwordUtils";

describe("passwordUtils", () => {
  describe("calculateStrengthMetrics", () => {
    it('should return "N/A" for an empty password', () => {
      const metrics: StrengthMetrics = calculateStrengthMetrics("");
      expect(metrics.text).toBe("N/A");
      expect(metrics.value).toBe(0);
      expect(metrics.color).toBe("bg-gray-500");
    });
    it('should return "Very Weak" for a short password', () => {
      const metrics: StrengthMetrics = calculateStrengthMetrics("a");
      expect(metrics.text).toBe("Very Weak");
    });
    it('should return "Weak" for a password like "abcdefgh"', () => {
      const metrics: StrengthMetrics = calculateStrengthMetrics("abcdefgh");
      expect(metrics.text).toBe("Weak");
    });

    it('should return "Medium" for a password like "Abcde1"', () => {
      const metrics: StrengthMetrics = calculateStrengthMetrics("Abcde1");
      expect(metrics.text).toBe("Medium");
    });

    it('should return "Strong" for a password like "Abcdefg!"', () => {
      const metrics: StrengthMetrics = calculateStrengthMetrics("Abcdefg!");
      expect(metrics.text).toBe("Strong");
    });

    it('should return "Very Strong" for a long, complex password', () => {
      const metrics: StrengthMetrics = calculateStrengthMetrics(
        "V3ryStr0ngP@sswOrd!"
      );
      expect(metrics.text).toBe("Very Strong");
      expect(metrics.value).toBe(100);
    });
  });

  describe("generateNewPassword", () => {
    it("should return an error if no character types are selected", () => {
      const options: GeneratePasswordOptions = {
        length: 12,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
      };
      const result = generateNewPassword(options);
      expect(result.error).toBe("Select at least one character type!");
      expect(result.password).toBeUndefined();
    });
    it("should generate a password of the specified length", () => {
      const options: GeneratePasswordOptions = {
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
      };
      const result = generateNewPassword(options);
      expect(result.password).toBeDefined();
      expect(result.password?.length).toBe(16);
      expect(result.error).toBeUndefined();
    });
    it("should only include uppercase letters if only uppercase is selected", () => {
      const options: GeneratePasswordOptions = {
        length: 10,
        includeUppercase: true,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: false,
      };
      const result = generateNewPassword(options);
      expect(result.password).toBeDefined();
      expect(
        result.password
          ?.split("")
          .every((char) => uppercaseChars.includes(char))
      ).toBe(true);
    });
    it("should only include symbols if only symbols are selected", () => {
      const options: GeneratePasswordOptions = {
        length: 10,
        includeUppercase: false,
        includeLowercase: false,
        includeNumbers: false,
        includeSymbols: true,
      };
      const result = generateNewPassword(options);
      expect(result.password).toBeDefined();

      const allCharsAreSymbols = result.password
        ?.split("")
        .every((char) => symbolChars.includes(char));
      expect(allCharsAreSymbols).toBe(true);
    });
    it("should include a mix of selected character types", () => {
      const options: GeneratePasswordOptions = {
        length: 20,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
      };
      const result = generateNewPassword(options);
      expect(result.password).toBeDefined();
      expect(/[A-Z]/.test(result.password!)).toBe(true);
      expect(/[a-z]/.test(result.password!)).toBe(true);
      expect(/[0-9]/.test(result.password!)).toBe(true);
      expect(/[^A-Za-z0-9]/.test(result.password!)).toBe(false); // sembol içermemeli
    });
  });
});
