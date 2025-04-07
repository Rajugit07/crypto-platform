import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiOutlineDiscord } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full h-auto p-20">
  <footer className="w-full flex items-start justify-between h-auto p-10 bg-[#111111] rounded-md border border-zinc-800 gap-10">

    {/* About Us */}
    <div className="w-1/3">
      <h1 className="text-2xl mb-2 font-semibold">About Us</h1>
      <p className="text-xl text-zinc-500">
      We’re a passionate dev team focused on building great apps that make tracking your crypto portfolio simple and seamless.
      </p>
    </div>

    {/* Quick Links */}
    <div className="w-1/3">
      <h1 className="text-2xl mb-2 font-semibold">Quick Links</h1>
      <ul className="flex flex-col gap-2 text-zinc-500">
        <li className="text-xl"><a href="/">Home</a></li>
        <li className="text-xl"><a href="/">About</a></li>
        <li className="text-xl"><a href="/">Contact</a></li>
      </ul>
    </div>

    {/* Connect With Us */}
    <div className="w-1/3">
      <h1 className="text-2xl mb-2 font-semibold">Connect With Us</h1>
      <ul className="flex flex-col gap-2 text-zinc-500">
        <li className="text-xl  "><a href="https://x.com/" target="_blank" className='flex items-center gap-2'>Twitter<FaXTwitter /></a></li>
        <li className="text-xl"><a href="https://www.instagram.com/" target="_blank" className='flex items-center gap-2'>Instagram<FaInstagram /></a></li>
        <li className="text-xl"><a href="https://discord.com/" target="_blank" className='flex items-center gap-2'>Discord<AiOutlineDiscord /></a></li>
      </ul>
    </div>

  </footer>
</div>

  )
}

export default Footer
