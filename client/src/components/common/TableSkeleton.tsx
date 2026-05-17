const TableSkeleton = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded"></div>

        <div className="h-8 bg-gray-200 rounded"></div>

        <div className="h-8 bg-gray-200 rounded"></div>

        <div className="h-8 bg-gray-200 rounded"></div>

        <div className="h-8 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;