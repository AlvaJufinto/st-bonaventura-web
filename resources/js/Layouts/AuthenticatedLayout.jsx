import { useState } from "react";

import Logo from "@/assets/logo/logo-bona-nav.svg";
import Dropdown from "@/Components/admin/Dropdown";
import NavLink from "@/Components/admin/NavLink";
import { Link } from "@inertiajs/react";

const LINKS = [
  {
    href: "dashboard",
    name: "Dashboard",
  },
  {
    href: "warta-minggu.index",
    name: "Warta Minggu",
  },
];

export default function Authenticated({ user, children, header }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`z-20 fixed top-0 left-0 h-full w-45 bg-white border-r border-gray-200 p-4 ${
          isSidebarOpen ? "block" : "hidden"
        } sm:block`}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <img className="h-12" src={Logo} alt="logo" />
          </Link>
          <button
            className="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <nav className="mt-6 flex flex-col space-y-2">
          {LINKS.map((link, i) => (
            <NavLink
              key={i}
              href={route(link.href)}
              active={route().current(link.href)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <header className="fixed w-full z-10 bg-white border-b pl-56 border-gray-200 p-4 flex justify-between items-center">
        {header}
        <button
          className="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        <div className="ms-auto relative">
          <Dropdown>
            <Dropdown.Trigger>
              <button className="font-secondary inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                {user.name}
                <svg
                  className="ms-2 -me-0.5 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Link
                href={route("logout")}
                method="post"
                as="button"
                className="text-red-500 font-semibold"
              >
                Log Out
              </Dropdown.Link>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </header>

      <div className="flex-1 flex flex-col py-12 pl-48">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
