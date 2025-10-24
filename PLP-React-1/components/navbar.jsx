import navData from "../utils/navbarlinks";
import { FaAlignJustify } from "react-icons/fa6";
import { useTheme } from "../hooks/useTheme";

const Navbar = ({ isOpen, toggleNav }) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="sticky top-0 bg-gray-800 dark:bg-white border-gray-200 shadow-md shadow-gray-500 p-4  flex justify-between items-center z-20 text-gray-800">
            <div
                className="p-1 cursor-pointer md:hidden"
                onClick={toggleNav}
                aria-label="Toggle navigation menu"
            >
                <FaAlignJustify
                    className={`text-2xl transition duration-300 ${isOpen ? "text-red-600" : "text-gray-600"
                        }`}
                />
            </div>

            <div className="hidden md:flex space-x-6 items-center">
                {navData.map((i) => (
                    <a
                        key={i.Path}
                        href={i.Path}
                        className="text-white dark:text-black font-medium hover:text-blue-600 transition duration-150"
                    >
                        {i.Label}
                    </a>
                ))}
            </div>


            <div className="flex items-center">
                <div
                    className="w-[50px] h-[25px] rounded-full flex items-center p-0.5 border border-gray-300 cursor-pointer bg-gray-200 dark:bg-gray-600"
                    onClick={toggleTheme}
                >
                    <div
                        className={`w-[22px] h-[22px] rounded-full transition-transform duration-300 ${theme === "dark"
                            ? "translate-x-0    ] bg-blue-950"
                            : "translate-x-[25px] bg-yellow-400"
                            }`}
                    />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-xl flex flex-col items-center py-4 space-y-3 md:hidden z-10">
                    {navData.map((i) => (
                        <a
                            key={i.Path}
                            href={i.Path}
                            className=" dark:text-gray-100 font-medium hover:text-blue-600 w-full text-center py-2 transition duration-150"
                        >
                            {i.Label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
