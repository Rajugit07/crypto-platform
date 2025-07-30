import axios from "axios";
import React, { useState, useEffect } from "react";
import CryptoPrice from "./CryptoPrice";
import Loading from "./Loading";
import { Search, ArrowLeft, ArrowRight, Zap, TrendingUp, BarChart3 } from "lucide-react";

export const CryptoList = () => {
    const [search, setSearch] = useState("");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoveredCoin, setHoveredCoin] = useState(null);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
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

        const delay = setTimeout(() => {
            fetchCoins();
        }, 500);

        return () => clearTimeout(delay);
    }, [search]);

    return (
        <div className="w-full h-auto px-4 sm:px-6 lg:px-20 py-6 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 min-h-screen">
            <div className="w-full h-auto mt-0">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                        Discover Cryptocurrencies
                    </h2>
                    <p className="text-gray-300 text-lg mb-6">
                        Search and explore thousands of digital assets
                    </p>
                </div>

                {/* Search Input */}
                <div className="relative mb-6 lg:mb-8 max-w-2xl mx-auto">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search cryptocurrency..."
                            className="w-full text-sm sm:text-md text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 pl-12 sm:pl-14 rounded-2xl border border-purple-500/30 outline-none bg-black/30 backdrop-blur-lg focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20 transition-all duration-300 placeholder-gray-400"
                            value={search}
                            onChange={handleChange}
                        />
                        <Search className="absolute left-4 sm:left-5 top-3 sm:top-4 lg:top-5 text-purple-400 text-xl sm:text-2xl group-focus-within:text-cyan-400 transition-colors" />
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                    </div>
                </div>

                {search && (
                    <div className="w-full mb-8 lg:mb-12">
                        {/* Desktop Layout */}
                        <div className="hidden lg:flex w-full h-[65vh] rounded-2xl justify-between">
                            <div className="w-full h-full flex flex-row justify-between gap-6 p-6">
                                {/* Coins List - Desktop */}
                                <div className="scrollbar-hide w-1/2 h-full bg-black/30 backdrop-blur-lg overflow-y-scroll gap-4 border border-purple-500/20 rounded-2xl p-6 shadow-2xl shadow-purple-500/10">
                                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-purple-500/20">
                                        <BarChart3 className="w-5 h-5 text-cyan-400" />
                                        <h3 className="text-white font-bold text-lg">Search Results</h3>
                                    </div>

                                    {loading && (
                                        <div className="flex justify-center py-8">
                                            <Loading />
                                        </div>
                                    )}
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                            <p className="text-red-400 text-center">{error}</p>
                                        </div>
                                    )}
                                    {coins.length > 0
                                        ? coins.map((coin, index) => (
                                              <div
                                                  key={coin.id}
                                                  className="group flex items-center p-4 text-white hover:bg-purple-500/10 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-500/30 rounded-xl mb-2"
                                                  onMouseEnter={() => setHoveredCoin(coin)}
                                                  onMouseLeave={() => setHoveredCoin(null)}
                                                  style={{ animationDelay: `${index * 0.1}s` }}
                                              >
                                                  <div className="relative mr-4">
                                                      <img
                                                          src={coin.thumb}
                                                          alt={coin.name}
                                                          className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                                                  </div>
                                                  <div className="flex-1">
                                                      <span className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                                                          {coin.name}
                                                      </span>
                                                      <div className="text-xs text-gray-400 mt-1">
                                                          Rank #{coin.market_cap_rank || 'N/A'}
                                                      </div>
                                                  </div>
                                                  <ArrowRight className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                              </div>
                                          ))
                                        : !loading && !error && (
                                              <div className="text-center py-12">
                                                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                      <Search className="w-8 h-8 text-gray-400" />
                                                  </div>
                                                  <p className="text-gray-400">No coins found</p>
                                              </div>
                                          )}
                                </div>

                                {/* Details Panel - Desktop */}
                                <div className="w-1/2 h-full bg-black/30 backdrop-blur-lg shadow-2xl shadow-purple-500/10 p-6 border border-purple-500/20 rounded-2xl">
                                    {hoveredCoin ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-white">
                                            <div className="relative">
                                                <img
                                                    src={hoveredCoin.large}
                                                    alt="coin"
                                                    className="w-24 h-24 lg:w-36 lg:h-36 mb-4 rounded-full"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full opacity-50 -z-10 blur-lg animate-pulse"></div>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                                                    {hoveredCoin.name}
                                                </h1>
                                                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl p-3 border border-purple-500/30">
                                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                                    <p className="text-gray-300 text-lg">
                                                        Market Cap Rank: #{hoveredCoin.market_cap_rank}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center">
                                            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
                                                <Zap className="w-10 h-10 text-gray-400" />
                                            </div>
                                            <p className="text-center text-gray-400 text-lg">
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
                                <div className="w-full max-h-[65vh] bg-black/30 backdrop-blur-lg overflow-y-scroll border border-purple-500/20 rounded-2xl shadow-lg shadow-purple-500/10">
                                    <div className="sticky top-0 bg-gradient-to-r from-purple-900/80 to-slate-900/80 backdrop-blur-lg border-b border-purple-500/30 p-4">
                                        <div className="flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-cyan-400" />
                                            <h3 className="text-white font-bold">Search Results</h3>
                                        </div>
                                    </div>

                                    {loading && (
                                        <div className="flex justify-center py-8">
                                            <Loading />
                                        </div>
                                    )}
                                    {error && (
                                        <div className="m-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                                            <p className="text-red-400 text-center">{error}</p>
                                        </div>
                                    )}
                                    {coins.length > 0
                                        ? coins.map((coin, index) => (
                                              <div
                                                  key={coin.id}
                                                  className="group flex items-center p-4 sm:p-6 text-white hover:bg-purple-500/10 active:bg-purple-500/20 transition-all duration-300 cursor-pointer border-b border-purple-500/10 last:border-b-0"
                                                  onClick={() => handleCoinSelect(coin)}
                                                  style={{ animationDelay: `${index * 0.05}s` }}
                                              >
                                                  <div className="relative mr-3 sm:mr-4">
                                                      <img
                                                          src={coin.thumb}
                                                          alt={coin.name}
                                                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                                                      />
                                                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full opacity-0 group-active:opacity-100 transition-opacity duration-300 -z-10 blur"></div>
                                                  </div>
                                                  <div className="flex-1">
                                                      <span className="text-base sm:text-lg font-semibold block group-hover:text-cyan-400 transition-colors">
                                                          {coin.name}
                                                      </span>
                                                      <span className="text-sm text-purple-400">
                                                          Tap to view details
                                                      </span>
                                                  </div>
                                                  <div className="flex items-center gap-2">
                                                      <span className="text-xs text-gray-400 hidden sm:block">
                                                          #{coin.market_cap_rank || 'N/A'}
                                                      </span>
                                                      <ArrowRight className="w-5 h-5 text-purple-400" />
                                                  </div>
                                              </div>
                                          ))
                                        : !loading && !error && (
                                              <div className="text-center py-12 px-4">
                                                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                      <Search className="w-8 h-8 text-gray-400" />
                                                  </div>
                                                  <p className="text-gray-400">No coins found</p>
                                              </div>
                                          )}
                                </div>
                            ) : (
                                /* Details View - Mobile */
                                <div className="w-full min-h-[65vh] bg-black/30 backdrop-blur-lg border border-purple-500/20 rounded-2xl shadow-lg shadow-purple-500/10 p-4 sm:p-6">
                                    {/* Back Button */}
                                    <button
                                        onClick={handleBackToList}
                                        className="flex items-center gap-2 text-purple-400 hover:text-cyan-400 transition-colors mb-6 p-2 rounded-lg hover:bg-purple-500/10"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        Back to search results
                                    </button>

                                    {selectedCoin && (
                                        <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 text-white text-center">
                                            <div className="relative">
                                                <img
                                                    src={selectedCoin.large}
                                                    alt="coin"
                                                    className="w-24 h-24 sm:w-32 sm:h-32 mb-4 rounded-full"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full opacity-50 -z-10 blur-lg animate-pulse"></div>
                                            </div>
                                            <div>
                                                <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
                                                    {selectedCoin.name}
                                                </h1>
                                                <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl p-3 border border-purple-500/30">
                                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                                    <p className="text-gray-300 text-lg sm:text-xl">
                                                        Market Cap Rank: #{selectedCoin.market_cap_rank}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Title */}
            <div className="text-center mb-8 lg:mb-12">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-4">
                    Today's Cryptocurrency Prices
                </h1>
                <p className="text-gray-300 text-lg">
                    Live market data by market capitalization
                </p>
            </div>

            {/* Crypto Price Table */}
            <div>
                <CryptoPrice />
            </div>
        </div>
    );
};

export default CryptoList;
