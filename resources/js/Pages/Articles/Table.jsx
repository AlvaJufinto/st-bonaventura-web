import Button from '@/Components/admin/Button';
import ImagePreviewer from '@/Components/guest/ImagePreviewer';
import {
  dateFormatter,
  statusColors,
} from '@/utils';
import { router } from '@inertiajs/react';

export default function Table({ articles }) {
  console.log("🚀 ~ Table ~ articles:", articles);
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const previewItem = (item) => {
    const url = route("article.guest.show", { slug: item.slug });
    window.open(url, "_blank");
  };

  return (
    <>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Title
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Preview
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Image
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Tanggal
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Publisher
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              User
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Tipe Artikel
            </th>
            <th className="p-3 text-left font-secondary text-sm uppercase font-semibold">
              Expired Date
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
          {articles.map((item, index) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition duration-300 ease-in-out`}
            >
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">{item.title}</span>
              </td>
              <td className="p-3 text-sm max-w-xs">
                <span className="font-secondary text-sm line-clamp-2">
                  {item.preview || "Tidak ada preview"}
                </span>
              </td>
              <td className="p-3 text-sm">
                {item.main_image_name ? (
                  <div className="w-24 h-18 overflow-hidden rounded-md">
                    <ImagePreviewer
                      src={`${ASSET_URL}/uploads/${item.main_image_name}`}
                      alt="Contoh Preview"
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <span className="font-secondary text-sm text-gray-500">
                    Tidak ada gambar
                  </span>
                )}
              </td>
              <td className="p-3 text-sm font-secondary ">
                {dateFormatter(item.created_at)}
              </td>
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">
                  {item.publisher?.name || "Tidak ada"}
                </span>
              </td>
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">
                  {item.user?.name || "Tidak ada"}
                </span>
              </td>
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">
                  {item.article_type?.name || "Tidak ada"}
                </span>
              </td>
              <td className="p-3 text-sm">
                <span className="font-secondary text-sm">
                  {item?.expired_date ? dateFormatter(item?.expired_date) : "-"}
                </span>
              </td>
              <td className={`p-3 ${statusColors[item.status_id]} text-sm`}>
                <span className="font-secondary text-sm uppercase tracking-wider font-semibold">
                  {item.status?.name || "Tidak ada"}
                </span>
              </td>
              <td className="p-3 text-sm flex flex-wrap gap-2">
                <Button
                  type="default"
                  onClick={() =>
                    router.visit(route("article.edit", { article: item.id }))
                  }
                >
                  Edit
                </Button>
                <Button type="info" onClick={() => previewItem(item)}>
                  Preview
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
