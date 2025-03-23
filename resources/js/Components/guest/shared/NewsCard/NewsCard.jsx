import Button from "../Button/Button";

export default function NewsCard({ data }) {
  return (
    <div className="border border-neutral-300 border-x-0 w-full flex justify-between items-center h-20">
      <p className="font-secondary pl-4">{data.date}</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">{data.title}</h1>
        <h3 className="text-b200 uppercase font-semibold tracking-wider font-secondary">
          {data.subtitle}
        </h3>
      </div>

      <Button
        className="w-60 h-full"
        onClick={() => window.open(data.link, "_blank")}
      >
        Baca
      </Button>
    </div>
  );
}
