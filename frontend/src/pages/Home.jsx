import React from "react";
import Navbar from "../components/Navbar";
import CryptoList from "../components/CryptoList";
import { useSelector } from "react-redux";
import CryptoAssist from "../components/CryptoAssist";
import Footer from "./Footer";

const Home = () => {
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-[#131313] text-white w-full h-auto">
            <Navbar />
            {user ? (
                <>
                    <div className="w-full h-auto flex flex-col items-center justify-center ">
                        <CryptoList />
                        <CryptoAssist />
                    </div>
                    <div className="w-full h-auto flex flex-col items-center justify-center ">
                        <Footer />
                    </div>
                </>
            ) : (
                <>
                    <div className="bg-[#131313] w-full h-screen">
                       <h1>Hii</h1>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
