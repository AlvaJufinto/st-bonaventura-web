export function dateFormatter(date) {
  const formattedDate = new Date(date);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return formattedDate.toLocaleDateString("en-GB", options);
}

export const statusColors = {
  1: "bg-gray-300",
  2: "bg-yellow-300",
  3: "bg-green-300",
};

export const getProperty = (type) =>
  type == "wilayah"
    ? {
        name: "Nama Wilayah",
        secondaryName: "Nama Wilayah Kedua",
        address: "Alamat",
        button: "Buat Wilayah Baru",
      }
    : {
        name: "Nama Lingkungan",
        secondaryName: "Nama Lingkungan Kedua",
        address: "Alamat",
        button: "Buat Lingkungan Baru",
      };

export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const articleDateFormatter = (dateString) => {
  const date = new Date(dateString);

  const day = date.getUTCDate(); // tanggal
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OKT",
    "NOV",
    "DEC",
  ];
  const month = monthNames[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return {
    day,
    month,
    year,
  };
};

export const titleName = {
  1: "Koordinator",
  2: "Ketua",
  4: "Ketua",
  5: "Ketua",
  6: "Ketua",
  7: "Ketua",
  9: "Ketua",
};
