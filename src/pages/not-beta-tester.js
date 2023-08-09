import Link from 'next/link';

const NotBetaTester = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">You are not a beta tester</h1>
        <p className="text-gray-700 mb-6">Sorry, you do not have the required role to access this page.</p>
        <Link href="/">
          <a className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">Home</a>
        </Link>
      </div>
    </div>
  );
};

export default NotBetaTester;