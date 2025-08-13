import { useState } from "react";

import Logo from "@/assets/logo/logo-bona-nav.svg";
import Button from "@/Components/admin/Button";
import Dropdown from "@/Components/admin/Dropdown";
import NavLink from "@/Components/admin/NavLink";
import Profile from "@/Components/admin/Profile";
import { Link, router, usePage } from "@inertiajs/react";

import FlashMessage from "./FlashMessage";

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const {
    props: {
      permissions: {
        allowToSeeWartaMinggu,
        allowToSeeAllTerritorial,
        allowToSeeAllPengurus,
        allowToSeeAllBidang,
        allowToSeeDPH,
        allowToSeeAuditLog,
        isHead,
      },
    },
  } = usePage();

  const LINKS = [
    {
      href: "dashboard",
      name: "Dashboard",
      isVisible: true,
    },
    {
      href: "organization.manage",
      name: "Kelola Organisasi",
      isVisible: isHead,
    },
    {
      href: "warta-minggu.index",
      name: "Warta Minggu",
      isVisible: allowToSeeWartaMinggu,
    },
    {
      href: "teritorial.index",
      name: "Wilayah & Lingkungan",
      isVisible: allowToSeeAllTerritorial,
    },
    {
      href: "bidang.index",
      name: "Bidang",
      isVisible: allowToSeeAllBidang,
    },
    {
      href: "article.index",
      name: "Berita dan Kegiatan",
      isVisible: true,
    },
    {
      href: "user.index",
      name: "Pengurus",
      isVisible: allowToSeeAllPengurus,
    },
    {
      href: "dph.index",
      name: "DPH",
      isVisible: allowToSeeDPH,
    },
    {
      href: "audit.index",
      name: "Audit Log",
      isVisible: allowToSeeAuditLog,
    },
  ];
  return (
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
        {LINKS.map(
          (link, i) =>
            link.isVisible && (
              <NavLink
                key={i}
                href={route(link.href)}
                active={route().current(link.href)}
              >
                {link.name}
              </NavLink>
            )
        )}
      </nav>
    </aside>
  );
}

function Header({ header, user }) {
  const {
    props: { impersonating },
  } = usePage();

  return (
    <header className="fixed w-full z-10 bg-white border-b pl-60 border-gray-200 p-4 flex justify-between items-center">
      {header}
      <button
        className="sm:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      <div className="ms-auto relative flex">
        {impersonating && (
          <Button
            onClick={() => router.post(route("impersonate.stop"))}
            type="danger"
          >
            stop
          </Button>
        )}
        <Dropdown>
          <Dropdown.Trigger>
            <button className="font-secondary inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
              <Profile user={user} />
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
            <Dropdown.Link href={route("profile.edit")} as="button">
              Profile
            </Dropdown.Link>
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
  );
}

export default function Authenticated({ user, children, header }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <Header header={header} user={user} />

      <div className="flex-1 flex flex-col py-12 pl-52">
        <FlashMessage />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
