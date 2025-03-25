import React, { useEffect, useRef, useState } from "react";

const ChurchStatistic = [
  { name: "Daya Tampung Umat", data: 500 },
  { name: "Jumlah Lingkungan", data: 49 },
  { name: "Usia Paroki Pulomas", data: 46 },
  { name: "Komunitas & Kategorial", data: 21 },
];

export default function Statistics() {
  const [counts, setCounts] = useState(ChurchStatistic.map(() => 0));
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start counting animation when the element is in view
          ChurchStatistic.forEach((stat, index) => {
            let start = 0;
            const end = stat.data;
            const duration = 1500; // Duration of the animation in ms
            const stepTime = Math.abs(Math.floor(duration / end));

            const timer = setInterval(() => {
              start += 1;
              setCounts((prevCounts) => {
                const newCounts = [...prevCounts];
                newCounts[index] = start;
                return newCounts;
              });
              if (start === end) clearInterval(timer);
            }, stepTime);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="outer-wrapper mb-32" ref={ref}>
      <div className="inner-wrapper !flex-row">
        {ChurchStatistic.map((stat, index) => (
          <div
            key={index}
            className={`grow flex flex-col items-center gap-2 ${
              index !== ChurchStatistic.length - 1
                ? "border-r border-gray-300"
                : ""
            }`}
          >
            <p className="text-8xl">{counts[index]}</p>
            <p className="font-secondary text-b200">{stat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
