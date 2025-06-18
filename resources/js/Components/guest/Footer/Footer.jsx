import IGLogo from "@/assets/icon/socials/ig-icon.svg";
import MailIcon from "@/assets/icon/socials/mail-icon.svg";
import PhoneIcon from "@/assets/icon/socials/phone-icon.svg";
import TikTokLogo from "@/assets/icon/socials/tiktok-icon.svg";
import YTLogo from "@/assets/icon/socials/yt-icon.svg";
import WhatsappIcon from "@/assets/icon/whatsapp.svg";
import LogoBona from "@/assets/logo/logo-bona.svg";

const socials = [
  {
    img: IGLogo,
    url: "https://www.instagram.com/stbonaventura/",
  },
  {
    img: TikTokLogo,
    url: "https://www.tiktok.com/@stbonaventura",
  },
  {
    img: YTLogo,
    url: "https://www.youtube.com/@KomsosBonaventura",
  },
];

export default function Footer() {
  return (
    <footer className="bg-b300 text-n100 w-full">
      <div className="outer-wrapper py-8 md:py-10 lg:py-14">
        <div className="inner-wrapper !grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-16 items-start">
          <div className="w-full">
            <h3 className="mb-4 lg:mb-5 text-xl lg:text-2xl">Kontak Kami</h3>
            <div className="flex gap-3 lg:gap-4 mb-4 lg:mb-5">
              {socials.map((social, index) => (
                <img
                  key={index}
                  src={social.img}
                  className="w-8 lg:w-10 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(social.url, "_blank")}
                  alt="Logo Socials"
                />
              ))}
            </div>
            <p className="mb-2 flex gap-3 lg:gap-4 items-center font-secondary text-sm lg:text-base">
              <img
                src={MailIcon}
                alt="Email Icon"
                className="w-4 lg:w-5 flex-shrink-0"
              />
              <span className="break-all font-secondary">
                parokipulomas@gmail.com
              </span>
            </p>
            <p className="flex gap-3 items-center font-secondary text-sm lg:text-base">
              <img src={PhoneIcon} alt="Phone Icon" className="flex-shrink-0" />
              (021) 4897347
            </p>
          </div>

          <div className="w-full md:border-l md:border-white md:pl-6 lg:pl-10">
            <h3 className="mb-4 lg:mb-5 text-xl lg:text-2xl">
              Jadwal Pelayanan Sekretariat
            </h3>
            <p className="mb-2 uppercase font-secondary flex flex-col sm:flex-row sm:gap-3 lg:gap-5 text-sm lg:text-base">
              <strong className="font-secondary">SENIN - MINGGU</strong>
              <span className="font-secondary">08.00 - 18.00</span>
            </p>
            <p className="mb-4 lg:mb-5 text-xs lg:text-sm text-y900 font-secondary font-semibold">
              Tanggal Merah Nasional LIBUR
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=6287704825850"
              target="_blank"
              className="flex gap-3 lg:gap-4 items-center font-secondary text-sm lg:text-base hover:opacity-80 transition-opacity"
            >
              <img
                src={WhatsappIcon}
                className="w-6 lg:w-8 flex-shrink-0"
                alt="WhatsApp Icon"
              />
              <span className="font-secondary">+6287704825850 (Chat Only)</span>
            </a>
          </div>

          <div className="w-full md:col-span-2 lg:col-span-1">
            <h3 className="mb-4 lg:mb-5 text-xl lg:text-2xl">Alamat</h3>
            <p className="font-secondary text-sm lg:text-base leading-relaxed">
              Jl. Pulo Mas Timur II No. 4, RT.4/RW.14, Kayu Putih, Pulo Gadung,
              Jakarta Timur, Jakarta
            </p>
          </div>
        </div>
      </div>

      <div className="outer-wrapper bg-b100 text-b300 text-center py-4 lg:py-5">
        <div className="inner-wrapper flex flex-col items-center gap-6 lg:gap-14 py-4 lg:py-5">
          <div className="flex flex-col items-center lg:items-start gap-3 lg:gap-4 w-full">
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 items-center text-center sm:text-left">
              <img
                src={LogoBona}
                alt="Logo"
                className="h-12 sm:h-16 lg:h-20 flex-shrink-0"
              />
              <h2 className="text-lg sm:text-2xl lg:text-4xl leading-tight">
                Santo Bonaventura Pulo Mas
              </h2>
            </div>
            <p className="font-secondary text-base sm:text-lg lg:text-2xl text-center lg:text-left">
              "Perjalanan Jiwa menuju Tuhan"
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 lg:pt-6 border-t border-b200">
            <p className="font-bold font-secondary text-xs sm:text-sm lg:text-base text-center sm:text-left">
              Copyright © 2024 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
