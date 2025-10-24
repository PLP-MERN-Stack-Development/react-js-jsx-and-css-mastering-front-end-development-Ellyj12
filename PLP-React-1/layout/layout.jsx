
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";

const Layout = () => {

    const [isOpen, setIsOpen] = useState(false)
    const toggleNav = () => { setIsOpen(prev => !prev); }
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-800">
            <Navbar isOpen={isOpen} toggleNav={toggleNav} />
            <main className="grow p-4 flex justify-center items-center">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
