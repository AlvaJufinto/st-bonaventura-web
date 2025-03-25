import LogoNavImg from "@/assets/logo/logo-bona-nav.svg";
import { Link, usePage } from "@inertiajs/react";

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
    menu: [
      { name: "Peta", url: `/peta`, urlName: "peta.index" },
      ...Array.from({ length: 11 }, (_, i) => ({
        name: `Wilayah ${i + 1}`,
        url: `/wilayah/${i + 1}`,
        urlName: "sector.guest.index",
      })),
    ],
  },
  {
    isMenu: false,
    name: "Bidang Pelayanan",
    url: "/bidang-pelayanan",
    urlName: "service.guest.index",
  },
];

export default function Navbar() {
  const { url } = usePage();

  console.log(url);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-center shadow-basic px-6 h-20 z-[1] bg-white">
      <div className="w-[1150px] px-4 flex justify-between">
        <div className="h-full flex items-center">
          <img src={LogoNavImg} alt="Logo Nav" className="h-16" />
        </div>
        <div className="flex gap-6 ">
          {LINKS.map((link, index) => {
            if (link.isMenu) {
              return (
                <div key={index} className="flex items-center relative group">
                  <p className="cursor-pointer">{link.name}</p>
                  <div className="absolute left-0 top-[100%] bg-white shadow-md w-max opacity-0 scale-y-0 origin-top transition-all duration-300 group-hover:opacity-100 group-hover:scale-y-100 z-1">
                    {link.menu.map((submenu, subIndex) => (
                      <Link
                        key={subIndex}
                        href={link.urlPrefix + submenu.url}
                        className={`block font-secondary text-xs px-4 py-2 hover:bg-gray-200  ${
                          url.includes(link.urlPrefix + submenu.url)
                            ? "!text-b300 font-semibold"
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
                className={`flex items-center ${
                  url === link.url ? "!text-b300 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
