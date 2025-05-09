import Button from "@/Components/guest/shared/Button/Button";

export default function ShortcutCard({ data }) {
  return (
    <div className="w-64 flex flex-col gap-6 items-start justify-between">
      <p className="font-secondary uppercase font-bold">{data.type}</p>
      <h1 className="text-3xl text-b200">{data.name}</h1>
      <p className="font-secondary">{data.description}</p>

      <a
        target="_blank"
        className="w-full"
        href={data.urlName ? route(data.urlName) : "/not-found"}
      >
        <Button className="w-full">Baca</Button>
      </a>
    </div>
  );
}
