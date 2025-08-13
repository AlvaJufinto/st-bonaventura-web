export default function Table({ data, columns }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-800 text-white">
          {columns.map((col, i) => (
            <th
              key={i}
              className={`p-3 font-secondary text-sm uppercase font-semibold text-${
                col.align ?? "left"
              } ${
                typeof col.thClassName === "function"
                  ? "" // header nggak butuh function class
                  : col.thClassName ?? ""
              }`}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr
            key={item.id ?? rowIndex}
            className={`${
              rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-200 transition duration-300 ease-in-out`}
          >
            {columns.map((col, colIndex) => {
              const tdClass =
                typeof col.tdClassName === "function"
                  ? col.tdClassName(item, rowIndex)
                  : col.tdClassName ?? "";
              return (
                <td
                  key={colIndex}
                  className={`p-3 font-secondary text-sm text-${
                    col.align ?? "left"
                  } ${tdClass}`}
                >
                  {col.render
                    ? col.render(item, rowIndex)
                    : // @ts-ignore
                      item[col.accessor] ?? "-"}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
