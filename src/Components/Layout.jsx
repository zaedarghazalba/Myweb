import { useState } from "react";
import NavbarSidebar from "./NavbarSidebar";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      <NavbarSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Tombol hamburger di mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-3 z-40 flex justify-between items-center">
        <div className="text-xl font-bold">Zaedar Ghazalba</div>
        <button onClick={() => setIsSidebarOpen(true)} className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" 
               viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <main className="flex-1 p-4 sm:p-8 mt-16 md:mt-0">
        {children}
      </main>
    </div>
  );
}
