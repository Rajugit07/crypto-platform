import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/images/logo2.png";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/user/logout`, {
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setIsMobileMenuOpen(false); // Close mobile menu after logout
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="w-full h-auto sticky top-0 z-[9999]">
            <nav className="flex items-center justify-between bg-[#111111] min-h-[10vh] px-4 sm:px-6 lg:px-10 rounded-md border-b border-zinc-800 w-full">
                {/* Logo */}
                <div className="px-2 sm:px-7 py-1.5 flex-shrink-0">
                    <a href="/">
                        <img src={logo} alt="logo" className="w-24 sm:w-32" />
                    </a>
                </div>

                {/* Title - Hidden on mobile */}
                <h1 className="hidden lg:block text-white font-semibold text-xl text-center">
                    Crypto Price Tracker
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center">
                    {user ? (
                        <div className="flex items-center gap-2 lg:gap-4">
                            <button
                                onClick={logoutHandler}
                                className="flex gap-1 lg:gap-2 items-center justify-center px-2 lg:px-4 py-1 border border-sky-300 rounded-md text-sky-400 text-sm lg:text-xl cursor-pointer hover:opacity-40"
                            >
                                <span className="hidden lg:inline">Logout</span>
                                <FiLogOut className="text-sm" />
                            </button>
                            <BsPersonCircle className="text-2xl lg:text-3xl text-sky-400" />
                            <h1 className="text-white font-semibold text-sm lg:text-xl max-w-[120px] truncate">
                                {user.fullname}
                            </h1>
                        </div>
                    ) : (
                        <div className="flex gap-2 lg:gap-4">
                            <button className="bg-[#6767d6] px-4 lg:px-7 py-1.5 rounded-md text-white font-semibold text-sm cursor-pointer">
                                <Link to="/login">Login</Link>
                            </button>
                            <button className="bg-[#6767d6] px-4 lg:px-7 py-1.5 rounded-md text-white font-semibold text-sm cursor-pointer">
                                <Link to="/signup">Signup</Link>
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden text-white text-2xl p-2"
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#111111] border-b border-zinc-800 px-4 py-4">
                    {/* Mobile Title */}
                    <h1 className="text-white font-semibold text-lg text-center mb-4 lg:hidden">
                        Crypto Price Tracker
                    </h1>

                    {user ? (
                        <div className="space-y-4">
                            {/* User Info */}
                            <div className="flex items-center justify-center gap-3 pb-4 border-b border-zinc-700">
                                <BsPersonCircle className="text-2xl text-sky-400" />
                                <h1 className="text-white font-semibold text-lg">
                                    {user.fullname}
                                </h1>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={logoutHandler}
                                className="flex gap-2 items-center justify-center px-4 py-2 border border-sky-300 rounded-md text-sky-400 text-lg cursor-pointer hover:opacity-40 w-full"
                            >
                                Logout
                                <FiLogOut className="text-sm" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <button className="bg-[#6767d6] px-7 py-2 rounded-md text-white font-semibold text-sm cursor-pointer w-full">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </button>
                            <button className="bg-[#6767d6] px-7 py-2 rounded-md text-white font-semibold text-sm cursor-pointer w-full">
                                <Link
                                    to="/signup"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Signup
                                </Link>
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default Navbar;
