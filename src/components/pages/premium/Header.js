import useTypewriter from "@/components/hooks/useTypewriter";
import Link from "next/link";

export default function Header() {
  const premiumText = useTypewriter("Premium!", 150, 75, 1000); // Typing, erasing & delay

  return (
    <header className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">
        Upgrade to <span className="text-blue-400">{premiumText}</span>
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto">
        Get exclusive access to premium features and enhance your experience
        with Waifu.it!
      </p>
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          const target = document.getElementById("billing-options");
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 80, // Adjusts for fixed headers (if needed)
              behavior: "smooth",
            });
          }
        }}
        className="inline-block mt-6 px-8 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white-900 rounded-lg transition"
      >
        Get Premium
      </Link>
    </header>
  );
}
