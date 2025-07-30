import React, { useState } from "react";
import {
    UserPlus,
    Mail,
    Lock,
    User,
    Zap,
    BarChart3,
    Shield,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${apiUrl}/api/user/register`, input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
            console.log("API URL:", apiUrl);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                        <div
                            key={i}
                            className="border border-cyan-500/10 animate-pulse"
                            style={{
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${Math.random() * 2 + 1}s`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Floating Numbers Animation */}
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute text-xs font-mono opacity-20 pointer-events-none text-purple-400"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${
                            Math.random() * 3 + 2
                        }s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                >
                    {Math.random() > 0.5 ? "+" : "-"}
                    {(Math.random() * 10 + 1).toFixed(1)}%
                </div>
            ))}

            <form
                onSubmit={submitHandler}
                className="relative z-10 min-w-96 max-w-sm sm:max-w-md md:max-w-lg h-auto bg-black/30 backdrop-blur-lg flex flex-col items-center justify-center gap-6 p-8 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
                {/* Logo/Brand Header */}
                <div className="w-full flex flex-col items-center mb-4">
                    <div className="inline-flex items-center mb-6 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            CryptoPulse
                        </span>
                    </div>

                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
                        <UserPlus className="text-3xl text-cyan-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                        Join CryptoPulse
                    </h2>
                    <p className="text-gray-300 text-sm text-center">
                        Create your account to start tracking crypto
                    </p>
                </div>

                {/* Full Name Input */}
                <div className="w-full relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <User className="w-5 h-5 text-purple-400 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={input.fullname}
                        name="fullname"
                        placeholder="Enter your full name"
                        className="w-full border border-purple-500/30 rounded-xl outline-none px-12 py-4 bg-black/20 backdrop-blur-lg text-white placeholder-gray-400 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                        onChange={changeHandler}
                        required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                </div>

                {/* Email Input */}
                <div className="w-full relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Mail className="w-5 h-5 text-purple-400 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                        type="email"
                        value={input.email}
                        name="email"
                        placeholder="Enter your email"
                        className="w-full border border-purple-500/30 rounded-xl outline-none px-12 py-4 bg-black/20 backdrop-blur-lg text-white placeholder-gray-400 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                        onChange={changeHandler}
                        required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                </div>

                {/* Password Input */}
                <div className="w-full relative group">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                        <Lock className="w-5 h-5 text-purple-400 group-focus-within:text-cyan-400 transition-colors" />
                    </div>
                    <input
                        type="password"
                        value={input.password}
                        name="password"
                        placeholder="Create a password"
                        className="w-full border border-purple-500/30 rounded-xl outline-none px-12 py-4 bg-black/20 backdrop-blur-lg text-white placeholder-gray-400 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300"
                        onChange={changeHandler}
                        required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="group relative w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-purple-500/25"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <Zap className="w-5 h-5 group-hover:animate-bounce" />
                        Create Account
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                </button>

                {/* Login Link */}
                <div className="w-full text-center">
                    <p className="text-sm text-gray-300">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-semibold hover:from-cyan-300 hover:to-purple-300 transition-all duration-300"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Security Features */}
                <div className="w-full space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Shield className="w-4 h-4 text-green-400" />
                        <span>Your data is encrypted and secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Zap className="w-4 h-4 text-yellow-400" />
                        <span>Instant access to real-time crypto data</span>
                    </div>
                </div>
            </form>

            <div>
                <Toaster
                    toastOptions={{
                        style: {
                            background:
                                "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(88, 28, 135, 0.95) 100%)",
                            color: "#fff",
                            border: "1px solid rgba(168, 85, 247, 0.3)",
                            borderRadius: "12px",
                            backdropFilter: "blur(16px)",
                        },
                        success: {
                            iconTheme: {
                                primary: "#22c55e",
                                secondary: "#fff",
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: "#ef4444",
                                secondary: "#fff",
                            },
                        },
                    }}
                />
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                        opacity: 0.4;
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;
