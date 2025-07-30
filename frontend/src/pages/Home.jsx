import React from "react";
import Navbar from "../components/Navbar";
import CryptoList from "../components/CryptoList";
import { useSelector } from "react-redux";
import CryptoAssist from "../components/CryptoAssist";
import Footer from "./Footer";
import LandingPage from "../components/LandingPage";
import { motion } from "framer-motion";

const Home = () => {
    const { user } = useSelector((store) => store.auth);

    const scrollToAssist = () => {
        document
            .getElementById("crypto-assist")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    // Animation variants for smooth fade and slide
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <div className="bg-[#131313] w-full h-auto">
            <Navbar />

            {user ? (
                <>
                    <motion.div
                        id="crypto-list"
                        className="w-full h-auto flex flex-col items-center justify-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUpVariant}
                    >
                        <CryptoList />
                    </motion.div>

                    <motion.div
                        id="crypto-assist"
                        className="w-full h-auto flex flex-col items-center justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                    >
                        <CryptoAssist />
                    </motion.div>

                    <motion.div
                        id="footer"
                        className="w-full h-auto flex flex-col items-center justify-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUpVariant}
                    >
                        <Footer />
                    </motion.div>

                    <button
                        onClick={scrollToAssist}
                        className="fixed bottom-10 right-10 px-4 py-2 bg-blue-600 text-white rounded shadow-lg"
                    >
                        Scroll to Assist
                    </button>
                </>
            ) : (
                <div className="bg-[#131313] w-full h-screen">
                    <LandingPage />
                </div>
            )}
        </div>
    );
};

export default Home;
