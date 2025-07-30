import React from "react";
import Navbar from "../components/Navbar";
import CryptoList from "../components/CryptoList";
import { useSelector } from "react-redux";
import CryptoAssist from "../components/CryptoAssist";
import Footer from "./Footer";
import LandingPage from "../components/LandingPage";

const Home = () => {
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-[#131313] w-full h-auto">
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
                       <LandingPage />
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
