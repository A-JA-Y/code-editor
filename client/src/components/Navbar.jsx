import React, { useState } from 'react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-gray-800">MyBrand</h1>
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a
                                href="#home"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                            >
                                Home
                            </a>
                            <a
                                href="#about"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                            >
                                About
                            </a>
                            <a
                                href="#services"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                            >
                                Services
                            </a>
                            <a
                                href="#contact"
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18.3 5.71a1 1 0 00-1.42-1.42L12 9.17 7.12 4.29A1 1 0 105.7 5.71L10.59 10.6 5.7 15.49a1 1 0 001.42 1.42L12 12.83l4.88 4.88a1 1 0 001.42-1.42l-4.89-4.88 4.89-4.89z"
                                    />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 110-2z"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a
                            href="#home"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                        >
                            About
                        </a>
                        <a
                            href="#services"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                        >
                            Services
                        </a>
                        <a
                            href="#contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-white hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
