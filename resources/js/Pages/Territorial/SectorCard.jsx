import Button from "@/Components/guest/Button/Button";
import { Link } from "@inertiajs/react";

export default function SectorCard({ item }) {
  const members = item.members || [];

  return (
    <div className="w-64 flex flex-col items-stretch p-4 bg-white">
      <div className="mb-8 space-y-2">
        <p className="font-secondary font-semibold">{item.address}</p>
        <h1 className="text-4xl leading-snug min-h-[2.5rem]">{item.name}</h1>
        <p className="text-b200 font-secondary font-semibold min-h-[3.5rem]">
          {item.alternate_name}
        </p>
      </div>

      {members.length > 0 && (
        <div className="mb-4 font-secondary">
          <p className="text-sm text-gray-600">Koordinator:</p>
          {members.map((m, idx) => (
            <p key={idx} className="font-semibold">{m.name}</p>
          ))}
        </div>
      )}

      <ul className="list-decimal pl-6 mb-12 font-secondary flex flex-col gap-4">
        {item.children?.map((child, index) => (
          <li key={index} className="font-secondary text-sm">
            {child.name} — {child.address}
          </li>
        ))}
      </ul>

      <Link className="w-auto mt-auto" href={`${item.slug}`}>
        <Button className="!w-full h-18">Selengkapnya</Button>
      </Link>
    </div>
  );
}
