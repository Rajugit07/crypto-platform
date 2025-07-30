import React, { useState, useEffect } from "react";
import {
    TrendingUp,
    TrendingDown,
    BarChart3,
    Zap,
    Shield,
    Globe,
} from "lucide-react";

export default function CryptoHero() {
    const [currentPrice, setCurrentPrice] = useState(45678.9);
    const [isRising, setIsRising] = useState(true);
    const [animatedNumbers, setAnimatedNumbers] = useState([]);

    // Simulate price updates
    useEffect(() => {
        const interval = setInterval(() => {
            const change = (Math.random() - 0.5) * 100;
            setCurrentPrice((prev) => Math.max(40000, prev + change));
            setIsRising(change > 0);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Generate floating animated numbers
    useEffect(() => {
        const numbers = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            value: Math.random() > 0.5 ? "+" : "-",
            percentage: (Math.random() * 10 + 1).toFixed(1),
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
        }));
        setAnimatedNumbers(numbers);
    }, []);

    const cryptoStats = [
        {
            name: "Bitcoin",
            symbol: "BTC",
            price: "$45,678",
            change: "+2.34%",
            rising: true,
        },
        {
            name: "Ethereum",
            symbol: "ETH",
            price: "$2,891",
            change: "+1.87%",
            rising: true,
        },
        {
            name: "Cardano",
            symbol: "ADA",
            price: "$0.52",
            change: "-0.91%",
            rising: false,
        },
        {
            name: "Solana",
            symbol: "SOL",
            price: "$98.45",
            change: "+4.12%",
            rising: true,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
            {animatedNumbers.map((num) => (
                <div
                    key={num.id}
                    className={`absolute text-xs font-mono opacity-30 pointer-events-none ${
                        num.value === "+" ? "text-green-400" : "text-red-400"
                    }`}
                    style={{
                        left: `${num.x}%`,
                        top: `${num.y}%`,
                        animation: `float ${num.duration}s ease-in-out infinite`,
                        animationDelay: `${num.delay}s`,
                    }}
                >
                    {num.value}
                    {num.percentage}%
                </div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-20">
                <div className="text-center mb-16">
                    {/* Logo/Brand */}
                    <div className="inline-flex items-center mb-8 group">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                            <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">
                            CryptoPulse
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 leading-tight">
                        Track Crypto
                        <br />
                        <span className="relative">
                            Like a Pro
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-lg animate-pulse"></div>
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Real-time cryptocurrency prices, advanced analytics, and
                        portfolio tracking. Stay ahead of the market with
                        lightning-fast updates and professional-grade tools.
                    </p>

                    {/* Live Price Display */}
                    <div className="inline-flex items-center bg-black/40 backdrop-blur-lg rounded-2xl p-6 mb-12 border border-purple-500/30">
                        <div className="flex items-center mr-6">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                            <span className="text-gray-400 text-sm">LIVE</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-3xl font-bold text-white mr-3">
                                $
                                {currentPrice.toLocaleString("en-US", {
                                    minimumFractionDigits: 2,
                                })}
                            </span>
                            {isRising ? (
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            ) : (
                                <TrendingDown className="w-6 h-6 text-red-400" />
                            )}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                            <span className="relative z-10 flex items-center">
                                Start Tracking Free
                                <Zap className="w-5 h-5 ml-2 group-hover:animate-bounce" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                        </button>
                        <button className="px-8 py-4 border border-purple-500/50 rounded-xl font-semibold text-white text-lg hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm">
                            View Live Demo
                        </button>
                    </div>
                </div>

                {/* Crypto Ticker */}
                <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {cryptoStats.map((crypto, index) => (
                            <div
                                key={crypto.symbol}
                                className="group p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/20 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="font-bold text-white">
                                            {crypto.symbol}
                                        </h3>
                                        <p className="text-xs text-gray-400">
                                            {crypto.name}
                                        </p>
                                    </div>
                                    <div
                                        className={`p-2 rounded-lg ${
                                            crypto.rising
                                                ? "bg-green-500/20"
                                                : "bg-red-500/20"
                                        }`}
                                    >
                                        {crypto.rising ? (
                                            <TrendingUp className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-400" />
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white text-lg">
                                        {crypto.price}
                                    </p>
                                    <p
                                        className={`text-sm ${
                                            crypto.rising
                                                ? "text-green-400"
                                                : "text-red-400"
                                        }`}
                                    >
                                        {crypto.change}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Zap className="w-8 h-8" />,
                            title: "Lightning Fast",
                            description:
                                "Real-time updates with sub-second latency across 1000+ cryptocurrencies",
                        },
                        {
                            icon: <Shield className="w-8 h-8" />,
                            title: "Bank-Grade Security",
                            description:
                                "Your data is protected with enterprise-level encryption and security protocols",
                        },
                        {
                            icon: <Globe className="w-8 h-8" />,
                            title: "Global Markets",
                            description:
                                "Track prices across all major exchanges worldwide with unified data feeds",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                        >
                            <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                        opacity: 0.6;
                    }
                }
            `}</style>
        </div>
    );
}
