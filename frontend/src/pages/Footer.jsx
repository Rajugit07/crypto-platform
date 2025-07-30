import React from "react";
import {
    Twitter,
    Instagram,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ArrowUp,
    Zap,
    BarChart3,
    TrendingUp,
    Globe,
} from "lucide-react";
import { AiOutlineDiscord } from "react-icons/ai";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="w-full mt-20 relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse"></div>
            </div>

            {/* Main Footer */}
            <footer className="relative w-full bg-gradient-to-br from-slate-900 via-purple-900/80 to-slate-900 backdrop-blur-lg border-t border-purple-500/30 shadow-2xl shadow-purple-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <div className="mb-8">
                                {/* Brand Logo */}
                                <div className="flex items-center mb-6 group">
                                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                                        CryptoPulse
                                    </h2>
                                </div>

                                <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-md">
                                    We're a passionate dev team focused on
                                    building great apps that make tracking your
                                    crypto portfolio simple and seamless. Stay
                                    ahead of the market with real-time data and
                                    insights.
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <div className="group flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                        <Mail className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                                        contact@cryptopulse.com
                                    </span>
                                </div>
                                <div className="group flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-green-400 transition-colors">
                                        +1 (555) 123-4567
                                    </span>
                                </div>
                                <div className="group flex items-center gap-3 p-3 rounded-xl bg-black/20 backdrop-blur-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                                    <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-300 group-hover:text-red-400 transition-colors">
                                        San Francisco, CA
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-xl font-bold text-white">
                                    Quick Links
                                </h3>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Home",
                                    "Portfolio",
                                    "Markets",
                                    "News",
                                    "About",
                                    "Contact",
                                ].map((link, index) => (
                                    <li
                                        key={link}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        <a
                                            href="/"
                                            className="group flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300 p-2 rounded-lg hover:bg-purple-500/10"
                                        >
                                            <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-cyan-400 transition-colors"></div>
                                            <span className="group-hover:translate-x-1 transform transition-transform">
                                                {link}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources & Social */}
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Globe className="w-5 h-5 text-purple-400" />
                                <h3 className="text-xl font-bold text-white">
                                    Resources
                                </h3>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "API Documentation",
                                    "Help Center",
                                    "Privacy Policy",
                                    "Terms of Service",
                                ].map((link, index) => (
                                    <li
                                        key={link}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                        }}
                                    >
                                        <a
                                            href="/"
                                            className="group flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300 p-2 rounded-lg hover:bg-purple-500/10"
                                        >
                                            <div className="w-1 h-1 bg-purple-400 rounded-full group-hover:bg-cyan-400 transition-colors"></div>
                                            <span className="group-hover:translate-x-1 transform transition-transform">
                                                {link}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            {/* Social Media */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="w-4 h-4 text-pink-400" />
                                    <h4 className="text-lg font-semibold text-white">
                                        Follow Us
                                    </h4>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        {
                                            icon: Twitter,
                                            href: "https://x.com/",
                                            gradient:
                                                "from-blue-400 to-cyan-500",
                                        },
                                        {
                                            icon: Instagram,
                                            href: "https://www.instagram.com/",
                                            gradient:
                                                "from-pink-400 to-rose-500",
                                        },
                                        {
                                            icon: AiOutlineDiscord,
                                            href: "https://discord.com/",
                                            gradient:
                                                "from-purple-400 to-indigo-500",
                                            isReactIcon: true,
                                        },
                                        {
                                            icon: Github,
                                            href: "https://github.com/",
                                            gradient:
                                                "from-gray-400 to-slate-500",
                                        },
                                        {
                                            icon: Linkedin,
                                            href: "https://linkedin.com/",
                                            gradient:
                                                "from-blue-500 to-blue-600",
                                        },
                                    ].map(
                                        (
                                            {
                                                icon,
                                                href,
                                                gradient,
                                                isReactIcon,
                                            },
                                            index
                                        ) => (
                                            <a
                                                key={index}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative p-3 bg-black/20 backdrop-blur-lg border border-purple-500/20 rounded-xl hover:border-purple-400/40 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                                style={{
                                                    animationDelay: `${
                                                        index * 0.1
                                                    }s`,
                                                }}
                                            >
                                                <div
                                                    className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`}
                                                ></div>
                                                {React.createElement(
                                                    icon,
                                                    {
                                                        className: `${
                                                            isReactIcon
                                                                ? "text-2xl"
                                                                : "w-5 h-5"
                                                        } text-gray-400 group-hover:text-white transition-colors relative z-10`
                                                    }
                                                )}
                                            </a>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="border-t border-purple-500/30 pt-8 mb-8">
                        <div className="max-w-2xl mx-auto text-center">
                            <div className="mb-6">
                                <h3 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                                    Stay Updated
                                </h3>
                                <p className="text-gray-300 text-lg">
                                    Get the latest crypto news and market
                                    insights delivered to your inbox.
                                </p>
                            </div>
                            <div className="relative group max-w-md mx-auto">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="email"
                                            placeholder="Enter your email..."
                                            className="w-full px-4 py-4 bg-black/30 backdrop-blur-lg border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                                    </div>
                                    <button className="group relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Subscribe
                                            <Zap className="w-4 h-4 group-hover:animate-bounce" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-purple-500/30 pt-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                            <div className="text-gray-300 text-center lg:text-left">
                                <p className="text-lg">
                                    &copy; {currentYear} CryptoPulse. All rights
                                    reserved.
                                </p>
                                <p className="text-sm mt-2 flex items-center justify-center lg:justify-start gap-1">
                                    Made with{" "}
                                    <span className="text-red-400 animate-pulse">
                                        ❤️
                                    </span>{" "}
                                    by passionate developers
                                </p>
                            </div>

                            {/* Back to Top Button */}
                            <button
                                onClick={scrollToTop}
                                className="group relative flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl text-gray-300 hover:text-white shadow-lg hover:border-purple-400 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
                            >
                                <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
                                <span className="hidden sm:inline font-semibold">
                                    Back to Top
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Enhanced Decorative Bottom Bar */}
            <div className="relative h-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 animate-pulse opacity-60"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-ping"></div>
            </div>
        </div>
    );
};

export default Footer;
