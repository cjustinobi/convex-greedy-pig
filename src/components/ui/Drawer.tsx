import Link from "next/link";
import { useDispatch } from "react-redux";
import { navLinks } from "@/lib/utils";
import Button from "../shared/Button";



const Drawer = () => {

   const dispatch = useDispatch()

   const modalHandler = () => {
     dispatch({ type: "modal/toggleGameModal" })
   }

  return (
    <div className="drawer lg:hidden justify-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-10">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-lg font-semibold text-gray-600 transition duration-100 hover:text-indigo-500 active:text-indigo-700 mb-10"
            >
              {link.text}
            </Link>
          ))}
          <div className="flex items-center gap-8 mb-10">
            <Button onClick={modalHandler} className="w-[200px]">
              Create Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
