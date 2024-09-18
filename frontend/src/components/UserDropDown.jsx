import { useState } from "react";
import { useSelector } from "react-redux";
import LogOut from "./LogOut";

const UserDropDown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state?.user?.userInfo);
  console.log("User: ", user);
  const handleDropdownBtnClick = () => {
    setShowDropdown(!showDropdown);
  };
  const { name: username, email } = user || {
    name: "JhonDoe",
    email: "JhonDoe@gamil.com",
  };
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleDropdownBtnClick}
        >
          {username || "Jhon Doe"}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {showDropdown && (
          <div className="py-1" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              {email || "JhonDoe@gamil.com"}
            </a>
            <LogOut />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropDown;
