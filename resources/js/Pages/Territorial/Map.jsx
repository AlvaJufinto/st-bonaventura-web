import MapImg from "@/assets/img/territorial/map.png";
import Footer from "@/Components/guest/Footer/Footer";
import LazyImage from "@/Components/guest/LazyImage";
import Navbar from "@/Components/guest/Navbar/Navbar";
import SectorCard from "@/Pages/Territorial/SectorCard";
import { Head } from "@inertiajs/react";

export default function Map({ wilayah }) {
  return (
    <div>
      <Head title="Warta Minggu" />
      <Navbar />
      <div className="outer-wrapper !py-40 !justify-start min-h-svh">
        <div className="inner-wrapper !items-start !justify-start relative">
          <div className="mb-5">
            <p className="small-title">teritorial</p>
            <h1 className="section-title">Peta Wilayah</h1>
          </div>
          <LazyImage src={MapImg} />
        </div>
        <div className="inner-wrapper !grid grid-cols-4 gap-10 gap-y-24 my-32 !items-stretch">
          {wilayah.map((item, index) => (
            <SectorCard key={index} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
