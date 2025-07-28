import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/images/logo2.png";

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const logoutHandler = async () => {
        try {
            const res = await axios.get(
                `${apiUrl}/api/user/logout`,
                {
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className=" w-full h-auto sticky top-0 z-[9999] ">
            <nav className=" flex items-center justify-between bg-[#111111] h-[10vh] px-10 rounded-md border-b border-zinc-800 w-full">
                <div className="px-7 py-1.5 ">
                  <a href="/">  <img src={logo} alt="logo" className="w-32" /></a>
                </div>
                 <h1 className="text-white font-semibold text-xl">Crypto Price Tracker</h1>

                {user ? (
                <div className="flex items-center gap-4">
                    <button
                        onClick={logoutHandler}
                        className="flex gap-2 items-center justify-center px-4 py-1 border border-sky-300 rounded-md text-sky-400  text-xl cursor-pointer hover:opacity-40"
                    >
                        Logout
                        <FiLogOut className="text-sm" />
                    </button>
                    <BsPersonCircle  className="text-3xl text-sky-400"/>
                    <h1 className="text-white font-semibold text-xl">{user.fullname}</h1>
                </div>
                ) : (
                    <div className="flex gap-4">
                        <button className="bg-[#6767d6] px-7 py-1.5 rounded-md text-white font-semibold text-sm cursor-pointer">
                            <Link to="/login">Login</Link>
                        </button>
                        <button className="bg-[#6767d6] px-7 py-1.5 rounded-md text-white font-semibold text-sm cursor-pointer">
                            <Link to="/signup">Signup</Link>
                        </button>
                    </div>
                 )}
             </nav>
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default Navbar;
