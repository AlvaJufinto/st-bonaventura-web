import Loading from "./Loading";

const buttonStyles = {
  primary:
    "bg-blue-600 text-white hover:brightness-110 focus:ring-2 focus:ring-blue-300 shadow-sm",
  danger:
    "bg-red-500 text-white hover:brightness-110 focus:ring-2 focus:ring-red-300 shadow-sm",
  warning:
    "bg-yellow-400 text-black hover:brightness-110 focus:ring-2 focus:ring-yellow-300 shadow-sm",
  success:
    "bg-green-500 text-white hover:brightness-110 focus:ring-2 focus:ring-green-300 shadow-sm",
  default:
    "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 shadow-sm",
};

export default function Button({
  children,
  type = "default",
  className = "",
  onClick,
  isLoading = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-md font-secondary transition duration-300 text-sm uppercase tracking-wider font-semibold flex items-center justify-center gap-2 ${
        buttonStyles[type] || buttonStyles.default
      } ${className} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {isLoading && <Loading />}
      {children}
    </button>
  );
}
