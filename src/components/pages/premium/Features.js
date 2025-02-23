import {
  FaBolt,
  FaRocket,
  FaStar,
  FaShieldAlt,
  FaGem,
  FaFire,
  FaTrophy,
} from "react-icons/fa";

export default function Features() {
  const featureIcons = [
    FaRocket,
    FaStar,
    FaShieldAlt,
    FaGem,
    FaBolt,
    FaFire,
    FaTrophy,
  ];

  const premiumFeatures = [
    "Higher Quota Limits",
    "Faster Response Times",
    "Access to All API Endpoints",
    "Early Access to Upcoming Features",
    "Priority Support",
    "API Integration Support",
    "Exclusive Discord Channel",
    "Bonus Quota",
  ];

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Why Go Premium? <span className="text-yellow-400">✨</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumFeatures.map((feature, index) => {
          const Icon = featureIcons[index % featureIcons.length]; // Cycle through unique icons
          return (
            <div
              key={index}
              className="bg-gray-900 p-6 rounded-xl text-center shadow-lg border border-gray-800 hover:border-sky-400 transition-all duration-300 focus:outline-none"
            >
              <Icon className="text-sky-400 text-3xl mb-3 mx-auto" />
              <p className="text-lg font-medium text-gray-200">{feature}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
