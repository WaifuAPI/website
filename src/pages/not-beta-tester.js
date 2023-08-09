import Link from "next/link";

const NotBetaTester = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <div className="max-w-md p-8 mx-auto bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          You are not a Beta Tester
        </h1>
        <p className="text-gray-300 mb-6">
          Sorry, you do not have the
          <span className="inline-block ml-1">
            <span
              className="text-white px-2 py-1 rounded-lg"
              style={{
                color: "rgb(0, 244, 85)",
                backgroundColor: "rgba(0, 244, 85, 0.1)",
              }}
            >
              <span>@🧪 Beta Tester</span>
            </span>
          </span>
          &nbsp;role to access this feature.
        </p>
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Home{" "}
        </Link>
      </div>
    </div>
  );
};

export default NotBetaTester;
