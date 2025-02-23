import { useEffect, useState } from "react";
import PremiumNavbar from "@/components/navbar/Premium";
import Header from "@/components/pages/premium/Header";
import Features from "@/components/pages/premium/Features";
import Plans from "@/components/pages/premium/Plans";
import Footer from "@/components/footer/Main";
import PremiumHead from "@/components/pages/premium/Head";

export default function Premium() {
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchValidation = async () => {
      try {
        const res = await fetch("/api/validate?page=premium");
        const data = await res.json();

        if (data?.page?.access) {
          setAllowed(true);
        } else {
          setAllowed(false);
          setMessage(
            data?.details?.page?.mode?.maintenance?.message || "Access denied."
          );
        }
      } catch (error) {
        setMessage("Error checking page availability.");
      }
    };

    fetchValidation();
  }, []);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white text-center p-6">
        <h1 className="text-2xl font-bold">{message}</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <PremiumHead />
      <PremiumNavbar />
      <Header />
      <Features />
      <Plans />
      <Footer />
    </div>
  );
}
