import axios from "axios";
import React, { useState, useEffect } from "react";
import CryptoCoinId from "./CryptoPrice";
import Loading from "./Loading";
import { IoSearchOutline } from "react-icons/io5";

export const CryptoList = () => {
    const [search, setSearch] = useState("");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoveredCoin, setHoveredCoin] = useState(null);
    const apiUrl = import.meta.env.REACT_APP_API_BASE_URL;

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search.trim() === "") {
            setCoins([]);
            return;
        }

        const fetchCoins = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get(
                    `${apiUrl}/api/crypto/search?coin=${search}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        withCredentials: true,
                    }
                );
                setCoins(res.data.coins);
            } catch (err) {
                setError("Failed to fetch data", err);
            }
            setLoading(false);
        };

        // Debounce API call (wait 500ms after last keystroke)
        const delay = setTimeout(() => {
            fetchCoins();
        }, 500);

        return () => clearTimeout(delay);
    }, [search]);

    return (
        <div className="w-full h-auto p-20 ">
            <div className="w-full h-auto mt-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full  text-md text-white mb-2 px-5 py-5 rounded-xl border border-zinc-800 outline-none"
                        value={search}
                        onChange={handleChange}
                    />
                    <IoSearchOutline className="absolute right-7 top-5  text-zinc-500 text-2xl" />
                </div>

                {search ? (
                    <div className="w-[100%] h-[65vh] rounded-md mb-5 flex justify-between">
                        <div className="w-full h-full flex flex-row justify-between gap-4 p-4">
                            {/* Coins List */}
                            <div className="scrollbar-hide w-1/2 h-full bg-[#111111]  overflow-y-scroll gap-4 border border-zinc-800 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)] ">
                                {loading && (
                                    <p>
                                        <Loading />
                                    </p>
                                )}
                                {error && (
                                    <p className="text-red-500">{error}</p>
                                )}
                                {coins.length > 0
                                    ? coins.map((coin) => (
                                          <div
                                              key={coin.id}
                                              className="flex items-center p-4  text-white hover:bg-zinc-900 transition duration-300 cursor-pointer border-b border-zinc-800"
                                              onMouseEnter={() =>
                                                  setHoveredCoin(coin)
                                              }
                                              onMouseLeave={() =>
                                                  setHoveredCoin(null)
                                              }
                                          >
                                              <img
                                                  src={coin.thumb}
                                                  alt={coin.name}
                                                  className="w-12 h-12 mr-4"
                                              />
                                              <span className="text-lg font-semibold">
                                                  {coin.name}
                                              </span>
                                          </div>
                                      ))
                                    : !loading &&
                                      !error && (
                                          <p className="text-gray-500">
                                              No coins found
                                          </p>
                                      )}
                            </div>

                            {/* Details Panel */}
                            <div className="w-1/2 h-full bg-[#111111] shadow-[0_4px_20px_rgba(0,0,0,0.6)]  p-4  border border-zinc-800 rounded-2xl  ">
                                {hoveredCoin ? (
                                    <div className=" w-full h-full flex flex-col items-center justify-center gap-2 ">
                                        <h1 className="text-xl font-bold">
                                            Name:{hoveredCoin.name}
                                        </h1>
                                        <p>
                                            Market Cap{" "}
                                            {hoveredCoin.market_cap_rank}
                                        </p>
                                        <img
                                            src={hoveredCoin.large}
                                            alt="coin"
                                            className="w-36 h-36 mb-4"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <p>Select a coin to see details</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <h1 className="text-4xl font-bold mt-10 mb-10">
                Today's Cryptocurrency Prices by Market Cap
            </h1>
            <div>
                <CryptoCoinId />
            </div>
        </div>
    );
};

export default CryptoList;
