import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoFingerPrintOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/reducer/authSlice";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${apiUrl}/api/user/login1`,
                input,
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (res.data.success) {
                dispatch(setAuthUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-[#131313]">
            <form
                onSubmit={submitHandler}
                className=" min-w-96 max-w-sm sm:max-w-md md:max-w-lg h-auto bg-[#111111] flex flex-col items-center justify-center gap-6 p-5 rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
            >
                <div className=" w-full h-1/6 flex justify-center ">
                    <IoFingerPrintOutline className="text-5xl mt-0 text-white   " />
                </div>
                <input
                    type="email"
                    name="email"
                    value={input.email}
                    placeholder="email"
                    className="w-full border  rounded-md outline-none px-4 py-2 border-zinc-800 text-white"
                    onChange={changeHandler}
                />
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    placeholder="password"
                    className="w-full border rounded-md outline-none px-4 py-2 border-zinc-800 text-white"
                    onChange={changeHandler}
                />
                <button
                    type="submit"
                    className="bg-black text-white w-full rounded-md py-2 cursor-pointer hover:bg-gray-900 transition"
                >
                    Login
                </button>
                <p className="text-sm text-white">
                    Don't have an account ?{" "}
                    <span>
                        <Link
                            to="/signup"
                            className="text-blue-600 font-semibold ml-1 text-sm"
                        >
                            Signup
                        </Link>
                    </span>{" "}
                </p>
            </form>
            <div>
                <Toaster />
            </div>
        </div>
    );
};

export default Login;
