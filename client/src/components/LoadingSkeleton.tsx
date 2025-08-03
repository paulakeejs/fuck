export const JetCardSkeleton = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 sm:h-64 bg-gray-800"></div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          <div className="h-4 bg-gray-800 rounded w-1/4 mt-2 sm:mt-0"></div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-3 bg-gray-800 rounded w-1/2 mb-1"></div>
              <div className="h-4 bg-gray-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
        <div className="h-16 bg-gray-800 rounded mb-4"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-800 gap-3 sm:gap-0">
          <div className="h-8 bg-gray-800 rounded w-1/4"></div>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="h-10 bg-gray-800 rounded w-24"></div>
            <div className="h-10 bg-gray-800 rounded w-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FiltersSkeleton = () => {
  return (
    <div className="mb-8 sm:mb-12 lg:mb-16 bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 animate-pulse">
      <div className="flex flex-col gap-4 sm:gap-6">
        <div className="h-10 bg-gray-800 rounded-lg w-full"></div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="h-10 bg-gray-800 rounded-lg w-24"></div>
          <div className="h-10 bg-gray-800 rounded-lg w-24"></div>
          <div className="h-10 bg-gray-800 rounded-lg flex-grow"></div>
        </div>
      </div>
    </div>
  );
};
