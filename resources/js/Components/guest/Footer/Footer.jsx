import IGLogo from '@/assets/icon/socials/ig-icon.svg';
import MailIcon from '@/assets/icon/socials/mail-icon.svg';
import PhoneIcon from '@/assets/icon/socials/phone-icon.svg';
import TikTokLogo from '@/assets/icon/socials/tiktok-icon.svg';
import YTLogo from '@/assets/icon/socials/yt-icon.svg';
import WhatsappIcon from '@/assets/icon/whatsapp.svg';
import LogoBona from '@/assets/logo/logo-bona.svg';

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
      <div className="outer-wrapper px-20 py-14">
        <div className="inner-wrapper !grid !grid-cols-3 gap-10 !place-items-start ">
          <div>
            <h3 className="mb-5 text-2xl">Kontak Kami</h3>
            <div className="flex gap-4 mb-5">
              {socials.map((social, index) => (
                <img
                  key={index}
                  src={social.img}
                  className="w-10 cursor-pointer"
                  onClick={() => window.open(social.url, "_blank")}
                  alt="Logo Socials"
                />
              ))}
            </div>
            <p className="mb-2 flex gap-4 items-center font-secondary">
              <img src={MailIcon} alt="Icon" />
              parokipulomas@gmail.com
            </p>
            <p className="flex gap-6 items-center font-secondary">
              <img src={PhoneIcon} alt="Icon" />
              (021) 4897347
            </p>
          </div>

          {/* Schedule Section */}
          <div className="border-l border-white pl-10">
            <h3 className="mb-5 text-2xl">Jadwal Pelayanan Sekretariat</h3>
            <p className="mb-2 uppercase font-secondary flex gap-5">
              <strong className="font-secondary">SENIN - MINGGU</strong> 08.00 -
              18.00
            </p>
            <p className="mb-5 text-sm text-y900 font-secondary font-semibold">
              Tanggal Merah Nasional LIBUR
            </p>
            <p className="flex gap-4 items-center font-secondary">
              <img src={WhatsappIcon} className="size-8 " alt="Icon" />
              +6287704825850 (Chat Only)
            </p>
          </div>

          {/* Address Section */}
          <div className="w-full">
            <h3 className="mb-5 text-2xl">Alamat</h3>
            <p className="font-secondary ">
              Jl. Pulo Mas Timur II No. 4, RT.4/RW.14, Kayu Putih, Pulo Gadung,
              Jakarta Timur, Jakarta
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-b100 text-b300 text-center py-5 outer-wrapper ">
        <div className="inner-wrapper !items-start gap-14 !py-5">
          <div className="flex flex-col items-start gap-4">
            <div className="flex gap-6 items-center text-2xl">
              <img src={LogoBona} alt="Logo" className="h-20" />
              <h2 className="text-4xl">Santo Bonaventura Pulo Mas</h2>
            </div>
            <p className="font-secondary text-2xl">
              "Perjalanan Jiwa menuju Tuhan"
            </p>
          </div>

          <div className="mt-10 w-full flex justify-between items-center">
            <p className="font-bold font-secondary">
              Copyright © 2024 All rights reserved
            </p>
            {/* <a
              className="font-watermark text-sm"
              href="https://alvajufinto.vercel.app/"
              target="_blank"
            >
              Designed & Developed by Stanislaus Alva
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
