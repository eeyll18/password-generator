// setler
export const uppercaseChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const lowercaseChars: string = "abcdefghijklmnopqrstuvwxyz";
export const numberChars: string = "0123456789";
export const symbolChars: string = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export interface StrengthMetrics {
  text: string;
  color: string;
  value: number;
}

export interface GeneratePasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export interface GeneratedPasswordResult {
  password?: string;
  error?: string;
}

/**
 * Verilen şifrenin gücünü hesaplar.
 * @param pwd Hesaplanacak şifre.
 * @returns StrengthMetrics objesi.
 */
export const calculateStrengthMetrics = (pwd: string): StrengthMetrics => {
  if (!pwd) return { text: "Yok", color: "bg-gray-500", value: 0 };

  let score = 0;
  if (pwd.length >= 16) score += 3;
  else if (pwd.length >= 12) score += 2;
  else if (pwd.length >= 8) score += 1;

  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd)) score++;

  if (score <= 1) return { text: "Çok Zayıf", color: "bg-red-500", value: 20 };
  if (score <= 2) return { text: "Zayıf", color: "bg-orange-500", value: 40 };
  if (score <= 3) return { text: "Orta", color: "bg-yellow-500", value: 60 };
  if (score <= 4) return { text: "Güçlü", color: "bg-green-500", value: 80 };
  return { text: "Çok Güçlü", color: "bg-emerald-600", value: 100 };
};

/**
 * Verilen seçeneklere göre güvenli bir şifre oluşturur.
 * @param options Şifre oluşturma seçenekleri.
 * @returns GeneratedPasswordResult objesi
 */
export const generateNewPassword = (
  options: GeneratePasswordOptions
): GeneratedPasswordResult => {
  const {
    length,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    includeUppercase,
  } = options;

  let charSet: string = "";
  if (includeUppercase) charSet += uppercaseChars;
  if (includeLowercase) charSet += lowercaseChars;
  if (includeNumbers) charSet += numberChars;
  if (includeSymbols) charSet += symbolChars;

  if (charSet === "") {
    return { error: "En az bir karakter tipi seçin!" };
  }

  let newPasswordGenerated: string = "";
  try {
    const crypto = window.crypto || (window as any).msCrypto;
    if (!crypto || !crypto.getRandomValues) {
      console.warn(
        "Güvenli rastgele sayı üreteci bulunamadı. Daha az güvenli bir yöntem kullanılıyor."
      );
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        newPasswordGenerated += charSet[randomIndex];
      }
    } else {
      const randomValues = new Uint32Array(length);
      crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        newPasswordGenerated += charSet[randomValues[i] % charSet.length]; // eşit olasılık
      }
    }
  } catch (error) {
    console.error("Şifre oluşturulurken hata:", error);
    return { error: "Şifre oluşturulurken bir hata oluştu." };
  }
  return { password: newPasswordGenerated };
};
