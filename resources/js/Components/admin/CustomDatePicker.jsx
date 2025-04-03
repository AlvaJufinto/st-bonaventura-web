const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function CustomDatePicker({ selectedDate, onDateChange }) {
  const handleChange = (e) => {
    const newDate = e.target.value;
    onDateChange(newDate);
  };

  return (
    <input
      type="date"
      value={selectedDate ? formatDate(selectedDate) : ""}
      onChange={handleChange}
      className="w-full border rounded-md p-2 font-secondary"
    />
  );
}
