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
