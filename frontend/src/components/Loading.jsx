import React from "react";
import loading from "../assets/images/gif.gif";

const Loading = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <img src={loading} alt="loading" className="w-8 text-center" />
        </div>
    );
};

export default Loading;
