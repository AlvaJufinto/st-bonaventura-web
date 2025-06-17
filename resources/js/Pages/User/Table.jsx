import Button from "@/Components/admin/Button";
import Profile from "@/Components/admin/Profile";
import { statusColors } from "@/utils";
import { router, usePage } from "@inertiajs/react";

export function highlight(text, keyword) {
  if (!keyword) return text;

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escapedKeyword})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200 text-black font-secondary">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

const loginAs = (user) => {
  if (confirm(`Login as ${user.name}?`)) {
    router.post(route("impersonate.login", user.id));
  }
};

export default function Table({ users, searchTerm }) {
  console.log("🚀 ~ Table ~ users:", users);
  const {
    props: {
      permissions: { canImpersonate },
    },
  } = usePage();

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
          <th className="p-3 text-left font-secondary text-sm uppercase font-semibold w-[250px]">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user.id}
            className={`${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-gray-200 transition duration-300 ease-in-out`}
          >
            <td className="p-3 text-sm font-secondary">
              <Profile
                user={{ ...user, name: highlight(user.name, searchTerm) }}
              />
            </td>
            <td className="p-3 text-sm font-secondary">
              {highlight(user.email, searchTerm)}
            </td>
            <td className="p-3 text-sm font-secondary">
              {user?.organizations.length === 0 && "Tidak ada"}
              {user?.organizations.length > 1 ? (
                <ul className="p-3 font-secondary list-decimal">
                  {user.organizations.map((org, i) => (
                    <li key={i} className="font-secondary">
                      {highlight(org.name, searchTerm)}
                    </li>
                  ))}
                </ul>
              ) : (
                highlight(user?.organizations[0]?.name ?? "", searchTerm)
              )}
            </td>
            <td
              className={`py-2 px-3 ${
                statusColors[user.status_id]
              } text-sm font-secondary uppercase font-bold tracking-wider`}
            >
              {user.status.name}
            </td>
            <td className="p-3 text-sm flex gap-2">
              <Button
                type="default"
                onClick={() => router.visit(route("user.edit", user.id))}
              >
                Detail
              </Button>
              {canImpersonate && (
                <Button type="primary" onClick={() => loginAs(user)}>
                  Log in as User
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
