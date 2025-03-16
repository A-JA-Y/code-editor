import React, { useState, useEffect, useRef } from 'react';
import { FaGear } from "react-icons/fa6";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const navRef = useRef(null);
    
    const toggleMenu = (menu) => {
        setActiveMenu((prev) => (prev === menu ? null : menu));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav ref={navRef} className="flex justify-between items-center bg-gray-800 p-4 relative">
            <div className="text-white font-bold text-xl">
                CodeEditor
            </div>
            <ul className="flex space-x-6">
                <li className="relative text-white hover:underline cursor-pointer" onClick={() => toggleMenu('File')}>
                    File
                    {activeMenu === 'File' && (
                        <ul className="absolute bg-gray-800 mt-2 py-2 w-40 transition-all duration-300 origin-top">
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">New File</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Open File</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Save</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Save As</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Close File</li>
                        </ul>
                    )}
                </li>
                <li className="relative text-white hover:underline cursor-pointer" onClick={() => toggleMenu('Edit')}>
                    Edit
                    {activeMenu === 'Edit' && (
                        <ul className="absolute bg-gray-800 mt-2 py-2 w-40 transition-all duration-300 origin-top">
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Undo</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Redo</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Cut</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Copy</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Paste</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Select All</li>
                        </ul>
                    )}
                </li>
                <li className="relative text-white hover:underline cursor-pointer" onClick={() => toggleMenu('View')}>
                    View
                    {activeMenu === 'View' && (
                        <ul className="absolute bg-gray-800 mt-2 py-2 w-40 transition-all duration-300 origin-top">
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Zoom In</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Zoom Out</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Reset Zoom</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Full Screen</li>
                        </ul>
                    )}
                </li>
                <li className="relative text-white hover:underline cursor-pointer" onClick={() => toggleMenu('Help')}>
                    Help
                    {activeMenu === 'Help' && (
                        <ul className="absolute bg-gray-800 mt-2 py-2 w-40 transition-all duration-300 origin-top">
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Documentation</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Report Issue</li>
                            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">About</li>
                        </ul>
                    )}
                </li>
            </ul>
            <button className=" hover:rotate-90 text-white font-bold  rounded transition-all duration-300">
                <FaGear />
            </button>
        </nav>
    );
};

export default Navbar;
