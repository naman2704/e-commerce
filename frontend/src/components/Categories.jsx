const Categories = () => {
  return (
    <div className="mt-4 flex items-center justify-center">
      {/* <div className="flex gap-x-2 py-1 px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium">California</span>
      </div> */}

      <div className="flex gap-x-8">
        {/* <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
          Best seller
        </span> */}
      </div>

      {/* <span className="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100">
        Becoma a seller
      </span> */}
    </div>
  );
};

export default Categories;
