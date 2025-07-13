'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { BsShield } from "react-icons/bs";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <div className="w-full bg-white shadow-md">
      <nav className="flex items-center justify-between px-5 py-6">
        {/* Logo */}
        <Link href="/dashboard">
          <div className="flex items-center gap-3 cursor-pointer">
            <BsShield className="text-blue-700" size={43} />
            <h1 className="text-4xl font-extrabold text-gray-900">Sentinel</h1>
          </div>
        </Link>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <HiX size={32} className="text-gray-800" /> : <HiMenuAlt3 size={32} className="text-gray-800" />}
          </button>
        </div>

        {/* Horizontal Nav (Desktop) */}
        <div className="hidden md:flex items-center   gap-26">
          <Link href="/dashboard">
            <button className="text-blue-600  cursor-pointer underline text-2xl">Home</button>
          </Link>
          <Link href="/help">
            <button className="text-blue-600 cursor-pointer underline text-2xl">Help</button>
          </Link>
          <Link href="/">
            <button className="bg-red-600 cursor-pointer text-white px-4 py-2 text-2xl rounded-md">Logout</button>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-5 py-4 space-y-7">
          <Link href="/dashboard" onClick={toggleMenu}>
            <p className="text-blue-600 cursor-pointer underline text-xl">Home</p>
          </Link>
          <Link href="/help" onClick={toggleMenu}>
            <p className="text-blue-600 cursor-pointer underline text-xl">Help</p>
          </Link>
          <Link href="/" onClick={toggleMenu}>
            <p className="text-red-600 cursor-pointer  underline text-xl">Logout</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopBar;
