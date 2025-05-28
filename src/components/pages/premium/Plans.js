import { useState, useEffect } from "react";
import {
  FaCheck,
  FaTimes,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/membership?q=plans"); // Adjust this URL as needed
        const data = await response.json();
        if (response.status === 500) {
          setPlans(null);
        } else {
          setPlans(data.membership.plans);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const handleTogglePlan = (value) => {
    NProgress.start(); // Start progress bar when button is clicked

    setTimeout(() => {
      setIsAnnual(value);
      NProgress.done(); // Stop progress bar after a short delay
    }, 500);
  };

  return (
    <div className="mx-auto px-4 py-4">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
      <div id="billing-options" className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              !isAnnual
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => handleTogglePlan(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isAnnual
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => handleTogglePlan(true)}
          >
            Annual
          </button>
        </div>
      </div>
      {!plans || plans.length === 0 ? (
        <div className="text-center text-red-500 text-lg font-semibold">
          🚨 No plans available. Please try again later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-700"
            >
              <div className="px-6 py-8 flex flex-col min-h-full">
                <h3 className="text-2xl font-semibold text-center mb-4">
                  {plan.name}
                </h3>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500">
                    /{isAnnual ? "year" : "month"}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.status === "available" ? (
                        <FaCheck className="text-green-500 mr-2" />
                      ) : feature.status === "limited" ? (
                        <FaExclamationCircle className="text-yellow-500 mr-2" />
                      ) : (
                        <FaTimes className="text-red-500 mr-2" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <button
                    className="mt-auto w-full bg-gray-700 text-gray-400 rounded-md py-2 font-semibold cursor-not-allowed opacity-50"
                    disabled
                    aria-label="Current Plan"
                  >
                    ✅ Current Plan
                  </button>
                ) : plan.available ? (
                  <button
                    className="mt-auto w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Choose ${plan.name} plan`}
                    href="https://discord.gg/yyW389c"
                  >
                    Choose Plan
                  </button>
                ) : (
                  <button
                    className="mt-auto w-full bg-gray-700 text-gray-400 rounded-md py-2 font-semibold cursor-not-allowed opacity-50"
                    disabled
                    aria-label="Plan not available"
                  >
                    🚫 Not Available
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 text-center text-gray-600">
        <p className="flex items-center justify-center">
          <FaInfoCircle className="mr-2" /> Prices are in USD. VAT may apply.
        </p>
      </div>
    </div>
  );
}
