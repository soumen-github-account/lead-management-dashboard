const TableSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded dark:bg-zinc-600"></div>

        <div className="h-8 bg-gray-200 rounded dark:bg-zinc-600"></div>

        <div className="h-8 bg-gray-200 rounded dark:bg-zinc-600"></div>

        <div className="h-8 bg-gray-200 rounded dark:bg-zinc-600"></div>

        <div className="h-8 bg-gray-200 rounded dark:bg-zinc-600"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;