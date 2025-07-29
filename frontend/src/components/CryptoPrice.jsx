import axios from "axios";
import React, { useState, useEffect } from "react";
import coins from "../coinId.json";
import Loading from "./Loading";

const CryptoCoinId = () => {
    const [price, setPrice] = useState([]);
    const [visibleRange, setVisibleRange] = useState(0); // index offset
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

                // If we've fetched all coins, stop here
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

                // If this was the last page, set hasMore to false
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
                // Load more when 100px near bottom
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

    // Format large numbers
    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
        return num?.toFixed(2);
    };

    // Format currency
    const formatCurrency = (value) => {
        if (!value) return "N/A";
        return `$${formatNumber(value)}`;
    };

    return (
        <div className="w-full px-2 sm:px-4 lg:px-6">
            {/* Desktop Table View */}
            <div
                id="price-container"
                className="hidden lg:block w-full h-[70vh] overflow-y-scroll rounded-2xl scrollbar-hide"
            >
                <table className="min-w-full border border-zinc-800 rounded-2xl bg-[#111111] text-left shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                    <thead>
                        <tr className="bg-white sticky top-0 z-10 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                            <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800">
                                Coin
                            </th>
                            <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800">
                                USD
                            </th>
                            <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800">
                                Market Cap
                            </th>
                            <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800">
                                24h Volume
                            </th>
                            <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800">
                                24h Change
                            </th>
                            <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800">
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(price).map(([coin, data]) => (
                            <tr
                                key={coin}
                                className="border-none hover:bg-zinc-800 text-xl"
                            >
                                <td className="py-6 px-4 text-white font-bold">
                                    {coin}
                                </td>
                                <td className="py-2 px-4 text-zinc-500 font-bold">
                                    ${data.usd}
                                </td>
                                <td className="py-2 px-4 text-zinc-500 font-bold">
                                    {formatCurrency(data.usd_market_cap)}
                                </td>
                                <td className="py-2 px-4 text-zinc-500 font-bold">
                                    {formatCurrency(data.usd_24h_vol)}
                                </td>
                                <td
                                    className={`py-2 px-4 font-bold ${
                                        data.usd_24h_change >= 0
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {data.usd_24h_change?.toFixed(2)}%
                                </td>
                                <td className="py-2 px-4 text-zinc-500 font-bold">
                                    {new Date(
                                        data.last_updated_at * 1000
                                    ).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                        {loading && (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    <div className="flex justify-center w-full mt-3">
                                        <Loading />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div
                id="price-container"
                className="lg:hidden w-full h-[70vh] overflow-y-scroll scrollbar-hide"
            >
                <div className="space-y-3 sm:space-y-4">
                    {Object.entries(price).map(([coin, data]) => (
                        <div
                            key={coin}
                            className="bg-[#111111] border border-zinc-800 rounded-xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:bg-zinc-800 transition-colors"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3 sm:mb-4">
                                <h3 className="text-white font-bold text-lg sm:text-xl">
                                    {coin.toUpperCase()}
                                </h3>
                                <div className="text-right">
                                    <div className="text-zinc-500 font-bold text-lg sm:text-xl">
                                        ${data.usd}
                                    </div>
                                    <div
                                        className={`font-bold text-sm sm:text-base ${
                                            data.usd_24h_change >= 0
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {data.usd_24h_change?.toFixed(2)}%
                                    </div>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <div className="text-zinc-400 text-xs sm:text-sm mb-1">
                                        Market Cap
                                    </div>
                                    <div className="text-zinc-500 font-semibold text-sm sm:text-base">
                                        {formatCurrency(data.usd_market_cap)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-zinc-400 text-xs sm:text-sm mb-1">
                                        24h Volume
                                    </div>
                                    <div className="text-zinc-500 font-semibold text-sm sm:text-base">
                                        {formatCurrency(data.usd_24h_vol)}
                                    </div>
                                </div>
                            </div>

                            {/* Last Updated */}
                            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-zinc-700">
                                <div className="text-zinc-400 text-xs sm:text-sm mb-1">
                                    Last Updated
                                </div>
                                <div className="text-zinc-500 font-semibold text-xs sm:text-sm">
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

export default CryptoCoinId;
