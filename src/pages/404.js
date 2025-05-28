import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 text-blue-900 text-center">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">
        Oh no~! This page is lost... (´•̥﹏•̥`)
      </p>
      <p className="text-lg mb-6">Did Senpai take a wrong turn? OwO</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
      >
        Take me home! 🏠
      </Link>
      <p className="mt-6 text-sm text-blue-600">
        Maybe the URL is just being tsundere? (´｡• ω •｡`)
      </p>
      {/* Apply the cursor dynamically */}
      <style jsx global>{`
        body {
          cursor: url("/cursors/foo603.cur"), auto;
        }
      `}</style>
    </div>
  );
}
