export function dateFormatter(date) {
  const formattedDate = new Date(date);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return formattedDate.toLocaleDateString("en-GB", options);
}
