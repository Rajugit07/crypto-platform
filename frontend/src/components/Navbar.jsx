import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import { BarChart3, Zap } from "lucide-react";


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
                setIsMobileMenuOpen(false);
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
            <nav className="flex items-center justify-between bg-gradient-to-r from-slate-900 via-purple-900/80 to-slate-900 backdrop-blur-lg min-h-[10vh] px-4 sm:px-6 lg:px-10 rounded-md border-b border-purple-500/30 w-full shadow-lg shadow-purple-500/10">
                {/* Logo */}
                <div className="px-2 sm:px-7 py-1.5 flex-shrink-0">
                    <a href="/" className="group flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform duration-300">
                            <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white hidden sm:block">
                            CryptoPulse
                        </span>
                    </a>
                </div>

                {/* Title - Hidden on mobile */}
                <h1 className="hidden lg:block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-bold text-xl text-center">
                    Crypto Price Tracker
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center">
                    {user ? (
                        <div className="flex items-center gap-2 lg:gap-4">
                            <button
                                onClick={logoutHandler}
                                className="group flex gap-1 lg:gap-2 items-center justify-center px-3 lg:px-4 py-2 bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl text-purple-400 text-sm lg:text-base cursor-pointer hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300"
                            >
                                <span className="hidden lg:inline">Logout</span>
                                <FiLogOut className="text-sm group-hover:animate-pulse" />
                            </button>
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                                <BsPersonCircle className="text-lg lg:text-xl text-white" />
                            </div>
                            <h1 className="text-white font-semibold text-sm lg:text-lg max-w-[120px] truncate">
                                {user.fullname}
                            </h1>
                        </div>
                    ) : (
                        <div className="flex gap-2 lg:gap-4">
                            <button className="group relative px-4 lg:px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white text-sm cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                                <Link to="/login" className="relative z-10 flex items-center">
                                    Login
                                </Link>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                            </button>
                            <button className="px-4 lg:px-6 py-2 border border-purple-500/50 rounded-xl font-semibold text-white text-sm hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm">
                                <Link to="/signup">Signup</Link>
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden text-white text-2xl p-2 hover:bg-purple-500/20 rounded-lg transition-colors duration-300"
                >
                    {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gradient-to-r from-slate-900 via-purple-900/90 to-slate-900 backdrop-blur-lg border-b border-purple-500/30 px-4 py-4 shadow-lg">
                    {/* Mobile Title */}
                    <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-bold text-lg text-center mb-4 lg:hidden">
                        Crypto Price Tracker
                    </h1>

                    {user ? (
                        <div className="space-y-4">
                            {/* User Info */}
                            <div className="flex items-center justify-center gap-3 pb-4 border-b border-purple-500/30">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                                    <BsPersonCircle className="text-lg text-white" />
                                </div>
                                <h1 className="text-white font-semibold text-lg">
                                    {user.fullname}
                                </h1>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={logoutHandler}
                                className="group flex gap-2 items-center justify-center px-4 py-3 bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl text-purple-400 text-lg cursor-pointer hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 w-full"
                            >
                                <Zap className="w-4 h-4 group-hover:animate-bounce" />
                                Logout
                                <FiLogOut className="text-sm" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <button className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white text-sm cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg w-full">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative z-10 flex items-center justify-center"
                                >
                                    <Zap className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                                    Login
                                </Link>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                            </button>
                            <button className="px-6 py-3 border border-purple-500/50 rounded-xl font-semibold text-white text-sm hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm w-full">
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
                <Toaster
                    toastOptions={{
                        style: {
                            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(88, 28, 135, 0.95) 100%)',
                            color: '#fff',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            borderRadius: '12px',
                            backdropFilter: 'blur(16px)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#22c55e',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default Navbar;
