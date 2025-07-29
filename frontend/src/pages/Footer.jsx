import React from "react";
import { FaXTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";
import { AiOutlineDiscord } from "react-icons/ai";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { BiUpArrowAlt } from "react-icons/bi";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full mt-20">
            {/* Main Footer */}
            <footer className="w-full bg-[#111111] border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                                    Crypto Tracker
                                </h2>
                                <p className="text-zinc-400 text-base lg:text-lg leading-relaxed max-w-md">
                                    We're a passionate dev team focused on
                                    building great apps that make tracking your
                                    crypto portfolio simple and seamless. Stay
                                    ahead of the market with real-time data and
                                    insights.
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <MdEmail className="text-xl text-blue-400" />
                                    <span>contact@cryptotracker.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <MdPhone className="text-xl text-green-400" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-3 text-zinc-400">
                                    <MdLocationOn className="text-xl text-red-400" />
                                    <span>San Francisco, CA</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Home",
                                    "Portfolio",
                                    "Markets",
                                    "News",
                                    "About",
                                    "Contact",
                                ].map((link) => (
                                    <li key={link}>
                                        <a
                                            href="/"
                                            className="text-zinc-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources & Social */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-6">
                                Resources
                            </h3>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "API Documentation",
                                    "Help Center",
                                    "Privacy Policy",
                                    "Terms of Service",
                                ].map((link) => (
                                    <li key={link}>
                                        <a
                                            href="/"
                                            className="text-zinc-400 hover:text-white transition-colors duration-300 hover:translate-x-1 transform inline-block"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Social Media */}
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-4">
                                    Follow Us
                                </h4>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        {
                                            icon: FaXTwitter,
                                            href: "https://x.com/",
                                            color: "hover:text-blue-400",
                                        },
                                        {
                                            icon: FaInstagram,
                                            href: "https://www.instagram.com/",
                                            color: "hover:text-pink-400",
                                        },
                                        {
                                            icon: AiOutlineDiscord,
                                            href: "https://discord.com/",
                                            color: "hover:text-purple-400",
                                        },
                                        {
                                            icon: FaGithub,
                                            href: "https://github.com/",
                                            color: "hover:text-gray-300",
                                        },
                                        {
                                            icon: FaLinkedin,
                                            href: "https://linkedin.com/",
                                            color: "hover:text-blue-500",
                                        },
                                    ].map(
                                        (
                                            { icon: Icon, href, color },
                                            index
                                        ) => (
                                            <a
                                                key={index}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`text-zinc-400 ${color} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
                                            >
                                                <Icon className="text-2xl" />
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="border-t border-zinc-800 pt-8 mb-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
                                Stay Updated
                            </h3>
                            <p className="text-zinc-400 mb-6">
                                Get the latest crypto news and market insights
                                delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email..."
                                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300 whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-zinc-800 pt-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                            <div className="text-zinc-400 text-center lg:text-left">
                                <p>
                                    &copy; {currentYear} Crypto Tracker. All
                                    rights reserved.
                                </p>
                                <p className="text-sm mt-1">
                                    Made with ❤️ by passionate developers
                                </p>
                            </div>

                            {/* Back to Top Button */}
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <BiUpArrowAlt className="text-xl" />
                                <span className="hidden sm:inline">
                                    Back to Top
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Decorative Bottom Bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
    );
};

export default Footer;
