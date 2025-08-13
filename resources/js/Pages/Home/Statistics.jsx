import React, { useEffect, useRef, useState } from "react";

export default function Statistics() {
  const getAge = (year, month, day) =>
    Math.floor((new Date() - new Date(year, month - 1, day)) / 3.15576e10);

  const ChurchStatistic = [
    { name: "Daya Tampung Umat", data: 500 },
    { name: "Jumlah Lingkungan", data: 49 },
    { name: "Usia Paroki Pulomas", data: getAge(1977, 7, 15) },
    { name: "Komunitas & Kategorial", data: 21 },
  ];

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
    <div className="outer-wrapper mb-16 md:mb-32" ref={ref}>
      <div className="inner-wrapper">
        {/* Mobile: 2x2 grid, Desktop: horizontal row */}
        <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-0 w-full">
          {ChurchStatistic.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 p-4 md:p-2 ${
                // Desktop borders (right border except last item)
                index !== ChurchStatistic.length - 1
                  ? "md:border-r md:border-gray-300"
                  : ""
              } ${
                // Mobile borders (bottom border for top row items)
                index < 2 ? "border-b border-gray-300 md:border-b-0" : ""
              } ${
                // Mobile borders (right border for left column items)
                index % 2 === 0 && index !== ChurchStatistic.length - 1
                  ? "border-r border-gray-300 md:border-r-0"
                  : ""
              } md:flex-1`}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-center">
                {counts[index]}
              </p>
              <p className="font-secondary text-sm sm:text-base md:text-lg text-center px-2">
                {stat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
