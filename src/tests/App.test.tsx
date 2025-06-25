import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "../App";

describe("App Component - Password Generator", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should render the main title", () => {
    render(<App />);
    expect(screen.getByText(/Password Generator/i)).toBeInTheDocument();
  });

  it("should generate a password on initial load", () => {
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(
      /Your Password/i
    ) as HTMLInputElement;
    expect(passwordInput.value).not.toBe("");
  });

  it('should generate a new password when "Generate New Password" button is clicked', async () => {
    const user = userEvent.setup(); // user simülasyon
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(
      /Your Password/i
    ) as HTMLInputElement;

    const generateButton = screen.getByRole("button", {
      name: /Generate New Password/i,
    });
    await user.click(generateButton);

    expect(passwordInput.value).not.toBe("");
  });

  it("should change password length when slider is used and regenerate password", async () => {
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(
      /Your Password/i
    ) as HTMLInputElement;

    const lengthSlider = screen.getByLabelText(/Password Length:/i);

    const lengthLabelElement = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "label" &&
        content.startsWith("Password Length:")
      );
    });
    fireEvent.change(lengthSlider, { target: { value: "20" } });

    await waitFor(() => {
      expect(lengthLabelElement).toHaveTextContent("Password Length: 20");
    });
    // zamanlama problemi vardı - animasyon - key kaynaklı
    await waitFor(() => {
      expect(passwordInput.value.length).toBe(20);
    });
  });

  it("should update password when character type options are changed", async () => {
    const user = userEvent.setup();
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(
      /Your Password/i
    ) as HTMLInputElement;

    const uppercaseCheckbox = screen.getByLabelText(/Uppercase \(A-Z\)/i);
    const symbolsCheckbox = screen.getByLabelText(/Symbols\ \(!@#...\)/i);

    if ((uppercaseCheckbox as HTMLInputElement).checked) {
      await user.click(uppercaseCheckbox);
    }
    if (!(symbolsCheckbox as HTMLInputElement).checked) {
      await user.click(symbolsCheckbox);
    }

    const newPassword = passwordInput.value;
    expect(newPassword).match(/^[a-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
    expect(newPassword).not.toMatch(/[A-Z]/);
  });

  it('should copy password to clipboard and show "Copied!" message', async () => {
    const user = userEvent.setup();
    render(<App />);
    const passwordInput = screen.getByPlaceholderText(
      /Your Password/i
    ) as HTMLInputElement;

    const clipboardSpy = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue(); //mock - writetext metodu izleniyor

    const copyButton = screen.getByTitle(/Copy Password/i);
    await user.click(copyButton);

    expect(clipboardSpy).toHaveBeenCalledWith(passwordInput.value);
    expect(screen.getByText("Copied!")).toBeInTheDocument();

    await expect(screen.findByText("Copied!")).resolves.toBeInTheDocument();

    // await new Promise((r) => setTimeout(r, 2500));
    // expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
  });

  it("should show an error message if no character types are selected", async () => {
    const user = userEvent.setup();
    render(<App />);
    const uppercaseCheckbox = screen.getByLabelText(/Uppercase \(A-Z\)/i);
    const lowercaseCheckbox = screen.getByLabelText(/Lowercase \(a-z\)/i);
    const numbersCheckbox = screen.getByLabelText(/Numbers \(0-9\)/i);
    const symbolsCheckbox = screen.getByLabelText(/Symbols\ \(!@#...\)/i);

    // seçiliyse kaldır
    if ((uppercaseCheckbox as HTMLInputElement).checked)
      await user.click(uppercaseCheckbox);
    if ((lowercaseCheckbox as HTMLInputElement).checked)
      await user.click(lowercaseCheckbox);
    if ((numbersCheckbox as HTMLInputElement).checked)
      await user.click(numbersCheckbox);
    if ((symbolsCheckbox as HTMLInputElement).checked)
      await user.click(symbolsCheckbox);

    expect(
      screen.getByText("Select at least one character type!")
    ).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(
      /Your Password/i
    ) as HTMLInputElement;
    expect(passwordInput.value).not.toBe("");
  });

  it("should update strength indicator based on password", async () => {
    const user = userEvent.setup();
    render(<App />);

    const lengthSlider = screen.getByLabelText(/Password Length:/i);
    fireEvent.change(lengthSlider, { target: { value: "20" } });

    const uppercaseCheckbox = screen.getByLabelText(/Uppercase \(A-Z\)/i);
    const lowercaseCheckbox = screen.getByLabelText(/Lowercase \(a-z\)/i);
    const numbersCheckbox = screen.getByLabelText(/Numbers \(0-9\)/i);
    const symbolsCheckbox = screen.getByLabelText(/Symbols\ \(!@#...\)/i);

    // seç
    if (!(uppercaseCheckbox as HTMLInputElement).checked)
      await user.click(uppercaseCheckbox);
    if (!(lowercaseCheckbox as HTMLInputElement).checked)
      await user.click(lowercaseCheckbox);
    if (!(numbersCheckbox as HTMLInputElement).checked)
      await user.click(numbersCheckbox);
    if (!(symbolsCheckbox as HTMLInputElement).checked)
      await user.click(symbolsCheckbox);

    expect(screen.getByText('Very Strong')).toBeInTheDocument()
  });
});
