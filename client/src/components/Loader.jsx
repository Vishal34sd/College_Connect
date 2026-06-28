const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-dark-700"></div>
        <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-primary-500 animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading tasks...</p>
    </div>
  );
};

export default Loader;
