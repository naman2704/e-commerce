import { useState } from "react";
import Categories from "./Categories";
import FilterBucket from "./FilterBucket";
import UserDropDown from "./UserDropDown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ userLoggedIn }) => {
  const user = useSelector((state) => state?.user?.userInfo);
  console.log("Header user: ", user);
  const [showCategories, setShowCategories] = useState(true);
  const handelCatgoriesClick = () => {
    setShowCategories(!showCategories);
  };
  return (
    <div className="bg-white">
      <div className="border py-3 px-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            <span className="ml-2 font-semibold text-[#252C32]">
              What a Market
            </span>
          </div>

          <div className="ml-6 flex flex-1 gap-x-3">
            <div
              className={`flex cursor-pointer select-none items-center gap-x-2 rounded-md border ${
                showCategories
                  ? "bg-[#4094F7] text-white hover:bg-blue-500"
                  : "bg-gray-500 text-white"
              } py-2 px-4`}
              onClick={handelCatgoriesClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="text-sm font-medium">Categories</span>
            </div>

            <input
              type="text"
              className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
              value="DJI phantom"
            />
          </div>
          {userLoggedIn ? (
            <div className="ml-2 flex">
              {/* <FilterBucket
                label="Orders"
                labelIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path
                      fillRule="evenodd"
                      d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              /> */}
              <FilterBucket
                label="Favorites"
                labelIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              />
              <FilterBucket
                label="Cart"
                labelIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                }
              />
              <UserDropDown />
            </div>
          ) : (
            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-gray-100">
              <Link to="/login">
                <span className="text-sm font-medium">Sign in</span>
              </Link>
            </div>
          )}
        </div>
        {showCategories && <Categories />}
      </div>
    </div>
  );
};

export default Header;
