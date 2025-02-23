import Link from "next/link";
import { FaFingerprint } from "react-icons/fa";

export default function ProfileCard() {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md p-6 mb-12 animate-fadeInUp">
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-xl text-gray-100">
            Decide what other users can see about you
          </h5>
          <p className="text-gray-400">
            Use the Privacy settings to alter your preferences!
          </p>
        </div>
        <FaFingerprint className="w-12 h-12 text-gray-400" />
      </div>
      <hr className="border-gray-700 my-4 mt-8" />
      <footer className="mt-4">
        <Link href="/dash/privacy" className="text-blue-400 hover:underline">
          Go to your Privacy settings
        </Link>
      </footer>
    </div>
  );
}
