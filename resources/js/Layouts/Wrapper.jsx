export default function Guest({ children }) {
  return (
    <div className="py-12">
      <div className="mx-auto sm:px-6">
        <div className="bg-white shadow-sm sm:rounded-lg">
          <div className="p-4 text-gray-900">{children}</div>
        </div>
      </div>
    </div>
  );
}
