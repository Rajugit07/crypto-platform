import axios from "axios";
import React, { useState, useEffect } from "react";
import coins from "../coinId.json";
import Loading from "./Loading";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Clock, Activity } from "lucide-react";

const CryptoPrice = () => {
    const [price, setPrice] = useState([]);
    const [visibleRange, setVisibleRange] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchAllPrice = async () => {
            try {
                setLoading(true);
                const coinId = coins.map((coin) => coin.id);
                const pageSize = 20;
                const start = visibleRange * pageSize;
                const end = start + pageSize;
                const apiUrl = import.meta.env.VITE_API_BASE_URL;

                if (start >= coinId.length) {
                    setHasMore(false);
                    setLoading(false);
                    return;
                }

                const paginatedCoins = coinId.slice(start, end);
                const coinIdParam = paginatedCoins.join(",");

                if (!coinIdParam) return;

                const resPrice = await axios.get(`${apiUrl}/api/crypto/price`, {
                    params: {
                        coinId: coinIdParam,
                        currency: "usd",
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });

                setPrice((prev) => ({ ...prev, ...resPrice.data }));
                setLoading(false);

                if (end >= coinId.length) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Error fetching prices:", error);
                setLoading(false);
            }
        };

        fetchAllPrice();
    }, [visibleRange]);

    useEffect(() => {
        const handleScroll = (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (
                scrollHeight - scrollTop <= clientHeight + 100 &&
                !loading &&
                hasMore
            ) {
                setVisibleRange((prev) => prev + 1);
            }
        };

        const container = document.getElementById("price-container");
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [loading]);

    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
        return num?.toFixed(2);
    };

    const formatCurrency = (value) => {
        if (!value) return "N/A";
        return `$${formatNumber(value)}`;
    };

    return (
        <div className="w-full px-2 sm:px-4 lg:px-6 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 min-h-screen">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                    Live Crypto Prices
                </h2>
                <p className="text-gray-300 text-lg">
                    Real-time cryptocurrency market data with lightning-fast updates
                </p>
            </div>

            {/* Desktop Table View */}
            <div
                id="price-container"
                className="hidden lg:block w-full h-[70vh] overflow-y-scroll rounded-2xl scrollbar-hide"
            >
                <div className="bg-black/30 backdrop-blur-lg rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-500/10">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-900/80 to-slate-900/80 backdrop-blur-lg sticky top-0 z-10 border-b border-purple-500/30">
                                <th className="py-6 px-6 text-lg font-bold text-white border-r border-purple-500/20">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                                        Coin
                                    </div>
                                </th>
                                <th className="py-6 px-6 text-lg font-bold text-white border-r border-purple-500/20">
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-5 h-5 text-green-400" />
                                        USD Price
                                    </div>
                                </th>
                                <th className="py-6 px-6 text-lg font-bold text-white border-r border-purple-500/20">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-purple-400" />
                                        Market Cap
                                    </div>
                                </th>
                                <th className="py-6 px-6 text-lg font-bold text-white border-r border-purple-500/20">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                                        24h Volume
                                    </div>
                                </th>
                                <th className="py-6 px-6 text-lg font-bold text-white border-r border-purple-500/20">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-400" />
                                        24h Change
                                    </div>
                                </th>
                                <th className="py-6 px-6 text-lg font-bold text-white">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-400" />
                                        Last Updated
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(price).map(([coin, data], index) => (
                                <tr
                                    key={coin}
                                    className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-all duration-300 group"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <td className="py-4 px-6 border-r border-purple-500/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">
                                                    {coin.substring(0, 2).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                                                {coin.toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 border-r border-purple-500/10">
                                        <span className="text-green-400 font-bold text-lg">
                                            ${data.usd}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 border-r border-purple-500/10">
                                        <span className="text-gray-300 font-semibold">
                                            {formatCurrency(data.usd_market_cap)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 border-r border-purple-500/10">
                                        <span className="text-gray-300 font-semibold">
                                            {formatCurrency(data.usd_24h_vol)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 border-r border-purple-500/10">
                                        <div className="flex items-center gap-2">
                                            {data.usd_24h_change >= 0 ? (
                                                <TrendingUp className="w-4 h-4 text-green-400" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-400" />
                                            )}
                                            <span
                                                className={`font-bold ${
                                                    data.usd_24h_change >= 0
                                                        ? "text-green-400"
                                                        : "text-red-400"
                                                }`}
                                            >
                                                {data.usd_24h_change?.toFixed(2)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-gray-400 text-sm">
                                            {new Date(
                                                data.last_updated_at * 1000
                                            ).toLocaleString()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {loading && (
                                <tr>
                                    <td colSpan={6} className="text-center py-8">
                                        <div className="flex justify-center w-full">
                                            <Loading />
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile/Tablet Card View */}
            <div
                id="price-container"
                className="lg:hidden w-full h-[70vh] overflow-y-scroll scrollbar-hide"
            >
                <div className="space-y-4">
                    {Object.entries(price).map(([coin, data], index) => (
                        <div
                            key={coin}
                            className="group bg-black/30 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-4 sm:p-6 shadow-lg shadow-purple-500/10 hover:border-purple-500/40 hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold">
                                            {coin.substring(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-cyan-400 transition-colors">
                                        {coin.toUpperCase()}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-green-400 font-bold text-lg sm:text-xl">
                                        ${data.usd}
                                    </div>
                                    <div className="flex items-center gap-1 justify-end">
                                        {data.usd_24h_change >= 0 ? (
                                            <TrendingUp className="w-4 h-4 text-green-400" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-red-400" />
                                        )}
                                        <span
                                            className={`font-bold text-sm sm:text-base ${
                                                data.usd_24h_change >= 0
                                                    ? "text-green-400"
                                                    : "text-red-400"
                                            }`}
                                        >
                                            {data.usd_24h_change?.toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-3 border border-purple-500/10">
                                    <div className="flex items-center gap-2 text-purple-400 text-xs sm:text-sm mb-2">
                                        <Activity className="w-4 h-4" />
                                        Market Cap
                                    </div>
                                    <div className="text-gray-300 font-semibold text-sm sm:text-base">
                                        {formatCurrency(data.usd_market_cap)}
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-3 border border-purple-500/10">
                                    <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm mb-2">
                                        <BarChart3 className="w-4 h-4" />
                                        24h Volume
                                    </div>
                                    <div className="text-gray-300 font-semibold text-sm sm:text-base">
                                        {formatCurrency(data.usd_24h_vol)}
                                    </div>
                                </div>
                            </div>

                            {/* Last Updated */}
                            <div className="mt-4 pt-4 border-t border-purple-500/20">
                                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm mb-1">
                                    <Clock className="w-4 h-4" />
                                    Last Updated
                                </div>
                                <div className="text-gray-300 font-semibold text-xs sm:text-sm">
                                    {new Date(
                                        data.last_updated_at * 1000
                                    ).toLocaleString()}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-center py-8">
                            <Loading />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CryptoPrice;
