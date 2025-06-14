import { useState } from "react";

import Arrow from "@/assets/icon/chevron-left.svg";
import LogoNavImg from "@/assets/logo/logo-bona-nav.svg";
import { Link, usePage } from "@inertiajs/react";

function ScrollToTop() {
  return (
    <div
      onClick={() => window.scrollTo(0, 0)}
      className="cursor-pointer fixed right-0 bottom-0 size-12 shadow-basic grid place-items-center m-10 z-20 bg-n100"
    >
      <img src={Arrow} alt="arrow" className="size-6 rotate-90" />
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const {
    props: { wilayahAll, bidangAll },
  } = usePage();
  const { url } = usePage();

  const LINKS = [
    {
      isMenu: false,
      name: "Beranda",
      url: "/",
      urlName: "home.guest.index",
    },
    {
      isMenu: true,
      name: "Tentang",
      urlPrefix: "/tentang",
      menu: [
        {
          name: "Dewan Paroki",
          url: "/dewan-paroki",
          urlName: "council.guest.index",
        },
        { name: "Sejarah", url: "/sejarah", urlName: "history.guest.index" },
        {
          name: "Santo Pelindung",
          url: "/santo-pelindung",
          urlName: "saint.guest.index",
        },
      ],
    },
    {
      isMenu: true,
      name: "Informasi",
      urlPrefix: "/informasi",
      menu: [
        {
          name: "Berita & Kegiatan",
          url: "/berita-kegiatan",
          urlName: "article.guest.index",
        },
        {
          name: "Warta Minggu",
          url: "/warta-minggu",
          urlName: "news.guest.index",
        },
      ],
    },
    {
      isMenu: false,
      name: "Sakramen",
      url: "/sakramen/baptis",
      urlName: "sacrament.guest.index",
    },
    {
      isMenu: true,
      name: "Wilayah",
      urlPrefix: "/wilayah",
      menu: [
        { name: "Peta", url: `/peta`, urlName: "peta.index" },
        ...wilayahAll.map((item) => ({
          name: item.name,
          url: `/${item.slug}`,
          urlName: "wilayah.show",
        })),
      ],
    },
    {
      isMenu: true,
      name: "Bidang Pelayanan",
      urlPrefix: "/bidang-pelayanan",
      menu: [
        ...bidangAll.map((item) => ({
          name: item.name,
          url: `/${item.slug}`,
          urlName: "bidang.show",
        })),
      ],
    },
  ];

  const isActive = (linkUrl) => {
    if (url.includes("wilayah")) return url == linkUrl;
    return url.includes(linkUrl);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-center shadow-basic h-20 z-50 bg-white">
        <div className="w-full max-w-[1150px] px-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            href={route("home.guest.index")}
            className="h-full flex items-center"
          >
            <img src={LogoNavImg} alt="Logo Nav" className="h-16" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-6">
            {LINKS.map((link, index) => {
              if (link.isMenu) {
                return (
                  <div key={index} className="flex items-center relative group">
                    <p className="cursor-pointer py-2">{link.name}</p>
                    <div className="absolute left-0 top-[100%] bg-white shadow-md w-max opacity-0 scale-y-0 origin-top transition-all duration-300 group-hover:opacity-100 group-hover:scale-y-100 z-10 max-w-40">
                      {link.menu.map((submenu, subIndex) => (
                        <Link
                          key={subIndex}
                          href={link.urlPrefix + submenu.url}
                          className={`block font-secondary text-xs px-4 py-2 hover:bg-gray-200 ${
                            isActive(link.urlPrefix + submenu.url)
                              ? "text-b300 font-semibold"
                              : ""
                          }`}
                        >
                          {submenu.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.url}
                  className={`flex items-center py-2 ${
                    url == link.url ? "text-b300 font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="lg:hidden flex flex-col gap-1 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed top-20 left-0 w-full bg-white shadow-lg z-40 transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-4 py-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            {LINKS.map((link, index) => {
              if (link.isMenu) {
                return (
                  <div key={index} className="border-b border-gray-200">
                    <button
                      className="w-full flex justify-between items-center py-4 text-left"
                      onClick={() => toggleSubmenu(index)}
                    >
                      <span>{link.name}</span>
                      <img
                        src={Arrow}
                        alt="arrow"
                        className={`size-4 transition-transform duration-300 ${
                          openSubmenu === index
                            ? "rotate-[-90deg]"
                            : "rotate-90"
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openSubmenu === index ? "max-h-96 pb-2" : "max-h-0"
                      }`}
                    >
                      {link.menu.map((submenu, subIndex) => (
                        <Link
                          key={subIndex}
                          href={link.urlPrefix + submenu.url}
                          className={`block pl-4 py-2 text-sm font-secondary hover:bg-gray-100 ${
                            isActive(link.urlPrefix + submenu.url)
                              ? "text-b300 font-semibold"
                              : ""
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {submenu.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={link.url}
                  className={`block py-4 border-b border-gray-200 ${
                    url == link.url ? "text-b300 font-semibold" : ""
                  }`}
                  onClick={closeMobileMenu}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
      <ScrollToTop />
    </>
  );
}
