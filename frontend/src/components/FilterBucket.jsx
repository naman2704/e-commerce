import React from "react";

const FilterBucket = ({ label, labelIcon }) => {
  return (
    <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 hover:bg-gray-100">
      {labelIcon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default FilterBucket;
