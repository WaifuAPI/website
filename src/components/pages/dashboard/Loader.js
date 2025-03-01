export default function Loader() {
  return (
    // <div className="flex flex-col items-center justify-center text-gray-100 text-center mt-20 animate-pulse">
    //   {/* Generic Skeleton Loader Effect */}
    //   <div className="ml-20 mr-6 w-full max-w-6xl space-y-6">
    //     <div className="h-6 bg-gray-700 rounded w-1/4"></div>
    //     <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    //     <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    //     <div className="h-8 bg-gray-600 rounded w-full"></div>
    //     <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    //     <div className="h-4 bg-gray-700 rounded w-1/3"></div>
    //     <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    //     <div className="h-4 bg-gray-700 rounded w-2/3"></div>
    //     <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    //   </div>
    // </div>

    <div className="flex items-center justify-center w-full h-screen bg-gray-900">
      <div className="w-full max-w-6xl space-y-6 p-6 animate-pulse">
        {/* Header Placeholder */}
        <div className="h-10 bg-gray-700 rounded w-1/4"></div>

        {/* Content Blocks */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded w-2/3"></div>
          <div className="h-10 bg-gray-600 rounded w-full"></div>
        </div>

        {/* Grid Placeholder for Dynamic Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
        </div>
      </div>
    </div>
  );
}
