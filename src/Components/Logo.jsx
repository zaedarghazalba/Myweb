import React from 'react';

const Logo = ({ className = "h-8 w-auto", collapsed = false }) => {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
                {/* Abstract ZG Logo Shape */}
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full transform transition-transform duration-500 hover:rotate-12"
                >
                    <rect width="100" height="100" rx="20" fill="currentColor" className="text-gray-900 dark:text-white" />
                    <path
                        d="M30 40H70L30 70H70"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white dark:text-black"
                    />
                    <path
                        d="M35 30V40M65 30V40"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        className="text-white dark:text-black opacity-40"
                    />
                </svg>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full -z-10 animate-pulse"></div>
            </div>

            {!collapsed && (
                <span className="font-bold text-lg md:text-xl tracking-tighter text-gray-900 dark:text-white hidden xs:block">
                    ZEEDAR<span className="text-blue-500">.</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
