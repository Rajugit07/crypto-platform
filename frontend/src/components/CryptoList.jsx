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
    const [selectedCoin, setSelectedCoin] = useState(null); // For mobile selection
    const [showDetails, setShowDetails] = useState(false); // For mobile details view
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
        setShowDetails(true);
    };

    const handleBackToList = () => {
        setShowDetails(false);
        setSelectedCoin(null);
    };

    useEffect(() => {
        if (search.trim() === "") {
            setCoins([]);
            setShowDetails(false);
            setSelectedCoin(null);
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
        <div className="w-full h-auto px-4 sm:px-6 lg:px-20 py-6 lg:py-20">
            <div className="w-full h-auto mt-0">
                {/* Search Input */}
                <div className="relative mb-4 lg:mb-6">
                    <input
                        type="text"
                        placeholder="Search cryptocurrency..."
                        className="w-full text-sm sm:text-md text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 rounded-xl border border-zinc-800 outline-none bg-[#111111] focus:border-zinc-600 transition-colors"
                        value={search}
                        onChange={handleChange}
                    />
                    <IoSearchOutline className="absolute right-4 sm:right-7 top-3 sm:top-4 lg:top-5 text-zinc-500 text-xl sm:text-2xl" />
                </div>

                {search && (
                    <div className="w-full mb-6 lg:mb-8">
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex w-full h-[65vh] rounded-md justify-between">
                            <div className="w-full h-full flex flex-row justify-between gap-4 p-4">
                                {/* Coins List - Desktop */}
                                <div className="scrollbar-hide w-1/2 h-full bg-[#111111] overflow-y-scroll gap-4 border border-zinc-800 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                                    {loading && (
                                        <div className="flex justify-center py-8">
                                            <Loading />
                                        </div>
                                    )}
                                    {error && (
                                        <p className="text-red-500 text-center">
                                            {error}
                                        </p>
                                    )}
                                    {coins.length > 0
                                        ? coins.map((coin) => (
                                              <div
                                                  key={coin.id}
                                                  className="flex items-center p-4 text-white hover:bg-zinc-900 transition duration-300 cursor-pointer border-b border-zinc-800 last:border-b-0"
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
                                                      className="w-12 h-12 mr-4 rounded-full"
                                                  />
                                                  <span className="text-lg font-semibold">
                                                      {coin.name}
                                                  </span>
                                              </div>
                                          ))
                                        : !loading &&
                                          !error && (
                                              <p className="text-gray-500 text-center py-8">
                                                  No coins found
                                              </p>
                                          )}
                                </div>

                                {/* Details Panel - Desktop */}
                                <div className="w-1/2 h-full bg-[#111111] shadow-[0_4px_20px_rgba(0,0,0,0.6)] p-4 border border-zinc-800 rounded-2xl">
                                    {hoveredCoin ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white">
                                            <img
                                                src={hoveredCoin.large}
                                                alt="coin"
                                                className="w-24 h-24 lg:w-36 lg:h-36 mb-4 rounded-full"
                                            />
                                            <h1 className="text-xl lg:text-2xl font-bold text-center">
                                                {hoveredCoin.name}
                                            </h1>
                                            <p className="text-zinc-400 text-lg">
                                                Market Cap Rank: #
                                                {hoveredCoin.market_cap_rank}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <p className="text-center text-gray-500 text-lg">
                                                Hover over a coin to see details
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Mobile/Tablet Layout */}
                        <div className="lg:hidden">
                            {!showDetails ? (
                                /* Coins List - Mobile */
                                <div className="w-full max-h-[65vh] bg-[#111111] overflow-y-scroll border border-zinc-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                                    {loading && (
                                        <div className="flex justify-center py-8">
                                            <Loading />
                                        </div>
                                    )}
                                    {error && (
                                        <p className="text-red-500 text-center p-4">
                                            {error}
                                        </p>
                                    )}
                                    {coins.length > 0
                                        ? coins.map((coin) => (
                                              <div
                                                  key={coin.id}
                                                  className="flex items-center p-4 sm:p-6 text-white hover:bg-zinc-900 active:bg-zinc-800 transition duration-300 cursor-pointer border-b border-zinc-800 last:border-b-0"
                                                  onClick={() =>
                                                      handleCoinSelect(coin)
                                                  }
                                              >
                                                  <img
                                                      src={coin.thumb}
                                                      alt={coin.name}
                                                      className="w-10 h-10 sm:w-12 sm:h-12 mr-3 sm:mr-4 rounded-full"
                                                  />
                                                  <div className="flex-1">
                                                      <span className="text-base sm:text-lg font-semibold block">
                                                          {coin.name}
                                                      </span>
                                                      <span className="text-sm text-zinc-400">
                                                          Tap to view details
                                                      </span>
                                                  </div>
                                                  <div className="text-zinc-400">
                                                      <svg
                                                          className="w-5 h-5"
                                                          fill="currentColor"
                                                          viewBox="0 0 20 20"
                                                      >
                                                          <path
                                                              fillRule="evenodd"
                                                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                              clipRule="evenodd"
                                                          />
                                                      </svg>
                                                  </div>
                                              </div>
                                          ))
                                        : !loading &&
                                          !error && (
                                              <p className="text-gray-500 text-center py-8 px-4">
                                                  No coins found
                                              </p>
                                          )}
                                </div>
                            ) : (
                                /* Details View - Mobile */
                                <div className="w-full min-h-[65vh] bg-[#111111] border border-zinc-800 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] p-4 sm:p-6">
                                    {/* Back Button */}
                                    <button
                                        onClick={handleBackToList}
                                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Back to search results
                                    </button>

                                    {selectedCoin && (
                                        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-white text-center">
                                            <img
                                                src={selectedCoin.large}
                                                alt="coin"
                                                className="w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-full"
                                            />
                                            <h1 className="text-2xl sm:text-3xl font-bold">
                                                {selectedCoin.name}
                                            </h1>
                                            <p className="text-zinc-400 text-lg sm:text-xl">
                                                Market Cap Rank: #
                                                {selectedCoin.market_cap_rank}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-6 lg:mt-10 mb-6 lg:mb-10 text-white text-center lg:text-left">
                Today's Cryptocurrency Prices by Market Cap
            </h1>

            {/* Crypto Price Table */}
            <div>
                <CryptoCoinId />
            </div>
        </div>
    );
};

export default CryptoList;
