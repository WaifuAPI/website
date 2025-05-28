export default function evaluatePasswordStrength(password) {
  if (!password) {
    return {
      strengthLabel: "",
      strengthStyle: {
        width: "0%",
        meterColor: "transparent",
        textColor: "gray",
      },
    };
  }

  // Character variety checks
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Common patterns to penalize
  const commonWords = [
    "password",
    "admin",
    "qwerty",
    "hello",
    "welcome",
    "user",
    "test",
    "letmein",
  ];
  const containsCommonWord = commonWords.some((word) =>
    password.toLowerCase().includes(word)
  );
  const isRepetitive = /(.)\1{3,}/.test(password); // "aaaa", "1111"
  const isSequential =
    /(abc|123|qwerty|asdf|password|abcdefg|ghijklmn|987|654|321)/i.test(
      password
    );
  const onlyLetters = /^[a-zA-Z]+$/.test(password);
  const onlyNumbers = /^\d+$/.test(password);
  const isLowEntropy = /^([a-zA-Z\d])\1+$/.test(password); // "aaaaaaa", "1111111"

  // **Immediate Weak Password Detection**
  if (
    password.length < 8 ||
    isRepetitive ||
    isSequential ||
    onlyLetters ||
    onlyNumbers ||
    isLowEntropy ||
    containsCommonWord
  ) {
    return {
      strengthLabel: "very weak",
      strengthStyle: {
        width: "20%",
        meterColor: "#dc2626",
        textColor: "#f87171",
      }, // Red
    };
  }

  // **Tiered Strength Calculation**
  let strengthLevel = 0;
  if (hasUpper) strengthLevel++;
  if (hasLower) strengthLevel++;
  if (hasNumber) strengthLevel++;
  if (hasSpecial) strengthLevel++;

  let strengthLabel = "";
  let strengthStyle = {};

  if (strengthLevel === 1) {
    strengthLabel = "weak.";
    strengthStyle = {
      width: "35%",
      meterColor: "#ff4500",
      textColor: "#ff6347",
    }; // Orange-Red
  } else if (strengthLevel === 2) {
    strengthLabel = "ok.";
    strengthStyle = {
      width: "55%",
      meterColor: "#ffa500",
      textColor: "#facc15",
    }; // Orange
  } else if (strengthLevel === 3) {
    strengthLabel = "good.";
    strengthStyle = {
      width: "75%",
      meterColor: "#9acd32",
      textColor: "#4ade80",
    }; // Yellow-Green
  } else if (strengthLevel === 4) {
    strengthLabel = "execellent!";
    strengthStyle = {
      width: "100%",
      meterColor: "#008000",
      textColor: "#16a34a",
    }; // Green
  }

  return { strengthLabel, strengthStyle };
}
