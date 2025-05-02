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
                const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

                // If we've fetched all coins, stop here
                if (start >= coinId.length) {
                    setHasMore(false);
                    setLoading(false);
                    return;
                }

                const paginatedCoins = coinId.slice(start, end);
                const coinIdParam = paginatedCoins.join(",");

                if (!coinIdParam) return;

                const resPrice = await axios.get(
                    `${apiUrl}/api/crypto/price`,
                    {
                        params: {
                            coinId: coinIdParam,
                            currency: "usd",
                        },
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );

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
    }, [visibleRange]); // empty dependency array = runs once on component mount

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

    return (
        <div
            id="price-container"
            className="w-full h-[70vh] overflow-y-scroll rounded-2xl scrollbar-hide "
        >
            {/* <h2 className="text-2xl text-white font-bold mb-4 sticky top-0">
                Crypto Prices
            </h2> */}
            <table className="min-w-full border border-zinc-800 rounded-2xl bg-[#111111] text-left shadow-[0_4px_20px_rgba(0,0,0,0.6)] ">
                <thead className=" ">
                    <tr className=" bg-white sticky top-0 z-10 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800  ">
                            Coin
                        </th>
                        <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800  ">
                            USD
                        </th>
                        <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800  ">
                            Market Cap
                        </th>
                        <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800  ">
                            24h Volume
                        </th>
                        <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800  ">
                            24h Change
                        </th>
                        <th className="py-6 px-4 text-xl font-bold text-black border-zinc-800  ">
                            Last 7 Days
                        </th>
                    </tr>
                </thead>
                <tbody className="">
                    {Object.entries(price).map(([coin, data]) => (
                        <tr
                            key={coin}
                            className="border-none hover:bg-zinc-800 text-xl"
                        >
                            <td className="py-6 px-4 text-white font-bold ">
                                {coin}
                            </td>
                            <td className="py-2 px-4 text-zinc-500 font-bold ">
                                ${data.usd}
                            </td>
                            <td className="py-2 px-4 text-zinc-500 font-bold ">
                                ${data.usd_market_cap}
                            </td>
                            <td className="py-2 px-4 text-zinc-500 font-bold">
                                ${data.usd_24h_vol}
                            </td>
                            <td className="py-2 px-4 text-zinc-500 font-bold">
                                {data.usd_24h_change}%
                            </td>
                            <td className="py-2 px-4 text-zinc-500 font-bold ">
                                {new Date(
                                    data.last_updated_at * 1000
                                ).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                    {loading && (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                <div className="relative left-[80vh] w-16 mt-3">
                                    <Loading />
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CryptoCoinId;
