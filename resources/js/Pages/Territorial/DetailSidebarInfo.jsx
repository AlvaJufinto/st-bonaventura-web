import { statusColors } from "@/utils";

const DetailSidebarInfo = ({ territory }) => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 font-secondary">
        {territory.name}
      </h2>
      <p className="text-sm text-gray-500 font-secondary">
        {territory.alternate_name}
      </p>
      <div className="space-y-2 text-gray-700 font-secondary">
        <p className="font-secondary">
          <span className="font-medium text-gray-900 font-secondary">
            Alamat:
          </span>{" "}
          {territory.address || "-"}
        </p>
        <p className="font-secondary">
          <span className="font-medium text-gray-900 font-secondary">
            Type:
          </span>{" "}
          {territory.type?.name || "-"}
        </p>
        <p className="font-secondary font-medium">Description :</p>
        {territory?.description || "-"}
        <div
          className={`w-fit font-secondary p-2 px-4 font-semibold rounded-full uppercase tracking-wider ${
            statusColors[territory.status_id]
          } `}
        >
          {territory.status?.name || "-"}
        </div>
      </div>
      {territory.children && territory.children.length > 0 && (
        <div>
          <h3 className="font-secondary text-lg font-semibold text-gray-800 mb-2">
            Lingkungan:
          </h3>
          <ul className="border rounded-lg divide-y divide-gray-200 ">
            {territory.children.map((child) => (
              <li
                key={child.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium text-gray-900">{child.name}</div>
                <div className="text-sm text-gray-500">
                  {child.alternate_name || "-"}
                </div>
                <div className="text-xs text-gray-400">
                  {child.address || "-"}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Status: {child.status?.name || "-"} | Type:{" "}
                  {child.type?.name || "-"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default DetailSidebarInfo;
