import { dateTimeFormatter } from "@/utils";

export default function Table({ logs }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="p-3 text-left font-secondary">User</th>
          <th className="p-3 text-left font-secondary">Action</th>
          <th className="p-3 text-left font-secondary">Object Type</th>
          <th className="p-3 text-left font-secondary">Object Label</th>
          <th className="p-3 text-left font-secondary">Changes</th>
          <th className="p-3 text-left font-secondary">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr
            key={log.id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
          >
            <td className="p-3 text-sm font-secondary">{log.user || "-"}</td>
            <td className="p-3 text-sm font-secondary">{log.action}</td>
            <td className="p-3 text-sm font-secondary">{log.auditable_type}</td>
            <td className="p-3 text-sm font-secondary">
              {log.auditable?.label || "-"}
            </td>
            <td className="p-3 text-sm font-secondary whitespace-pre-line">
              {log.data
                ? Object.entries(log.data).map(([key, value]) => (
                    <div key={key}>
                      <strong className="font-secondary">{key}</strong>:{" "}
                      <span className="text-red-600 line-through font-secondary">
                        {String(value.old)}
                      </span>{" "}
                      →{" "}
                      <span className="text-green-600 font-secondary">
                        {String(value.new)}
                      </span>
                    </div>
                  ))
                : "-"}
            </td>
            <td className="p-3 text-sm font-secondary">
              {dateTimeFormatter(log.created_at)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
