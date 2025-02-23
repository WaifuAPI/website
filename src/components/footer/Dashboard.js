import Link from "next/link";

export default function Footer() {
  return (
    // bg-gray-900 border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all
    <footer className="py-6 px-4 lg:px-18 mt-5 mb-5 ">
      <hr className="border-t border-gray-700 mb-4" />
      <div className="container mx-auto px-3 text-center lg:text-left -translate-y-2">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-white mt-2">&copy; Waifu.it 2025</div>
          <div className="flex justify-center lg:justify-start space-x-4">
            <Link
              target="_blank"
              href="https://raw.githubusercontent.com/WaifuAPI/Waifu.it/production/PRIVACY_POLICY.md"
              className="text-gray-400 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              target="_blank"
              href="https://docs.waifu.it/tos"
              className="text-gray-400 hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              target="_blank"
              href="https://ko-fi.com/Aeryk"
              className="text-gray-400 hover:text-white"
            >
              Get me a Coffee!
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
