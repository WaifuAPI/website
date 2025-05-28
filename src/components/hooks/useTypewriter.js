import { useState, useEffect } from "react";

export default function useTypewriter(
  text,
  speed = 150,
  eraseSpeed = 75,
  delay = 1000
) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      // Typing effect
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
    } else if (isDeleting && index > 0) {
      // Erasing effect
      timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
        setIndex(index - 1);
      }, eraseSpeed);
    } else {
      // Pause before deleting or restarting
      timeout = setTimeout(() => {
        setIsDeleting((prev) => !prev);
      }, delay);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, eraseSpeed, delay]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return `${displayText}${cursorVisible ? "|" : ""}`;
}
