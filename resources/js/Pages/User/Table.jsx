import Button from "@/Components/admin/Button";
import Profile from "@/Components/admin/Profile";
import { statusColors } from "@/utils";

export default function Table({ users }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-800 text-white">
          <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
            Full Name
          </th>
          <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
            Email
          </th>
          {/* <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
            Role
          </th> */}
          <th className="p-3 text-left font-secondary text-xs uppercase font-semibold">
            Organisasi/Wilayah/Lingkungan
          </th>
          <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
            Status
          </th>
          <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.data.map((user, index) => (
          <tr
            key={user.id}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-200 transition duration-300 ease-in-out`}
          >
            <td className="p-3 text-sm font-secondary">
              <Profile user={user} />
            </td>
            <td className="p-3 text-sm font-secondary">{user.email}</td>
            {/* <td className="p-3 text-sm font-secondary capitalize">
              {user.role?.name || "-"}
            </td> */}
            <td className="p-3 text-sm font-secondary">
              {user.organization?.name || "-"}
            </td>
            <td
              className={`py-2 px-3 ${
                statusColors[user.status_id]
              } text-sm font-secondary uppercase font-bold tracking-wider`}
            >
              {user.status.name}
            </td>
            <td className="p-3 text-sm">
              <Button type="default">Detail</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
