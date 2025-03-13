import React from 'react';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-gray-800 p-4 relative">
            <div className="text-white font-bold text-xl">
                CodeEditor
            </div>
            <ul className="flex space-x-6">
                <li className="relative group text-white hover:underline cursor-pointer">
                    File
                    <ul className="absolute bg-gray-800 mt-2 py-2 w-40 opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto origin-top">
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">New File</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Open File</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Save</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Save As</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Close File</li>
                    </ul>
                </li>
                <li className="relative group text-white hover:underline cursor-pointer">
                    Edit
                    <ul className="absolute bg-gray-800 mt-2 py-2 w-40 opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto origin-top">
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Undo</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Redo</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Cut</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Copy</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Paste</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Select All</li>
                    </ul>
                </li>
                <li className="relative group text-white hover:underline cursor-pointer">
                    View
                    <ul className="absolute bg-gray-800 mt-2 py-2 w-40 opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto origin-top">
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Zoom In</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Zoom Out</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Reset Zoom</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Full Screen</li>
                    </ul>
                </li>
                <li className="relative group text-white hover:underline cursor-pointer">
                    Help
                    <ul className="absolute bg-gray-800 mt-2 py-2 w-40 opacity-0 transform scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto origin-top">
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Documentation</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Report Issue</li>
                        <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">About</li>
                    </ul>
                </li>
            </ul>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                Settings
            </button>
        </nav>
    );
};

export default Navbar;
