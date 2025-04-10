import NavbarSidebar from "./NavbarSidebar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <NavbarSidebar />
      <main className="flex-1 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
