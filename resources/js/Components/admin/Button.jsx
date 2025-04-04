const buttonStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-500",
  danger: "bg-red-600 text-white hover:bg-red-500",
  warning: "bg-yellow-300 text-black hover:bg-yellow-500",
  success: "bg-green-600 text-white hover:bg-green-500",
  default: "bg-gray-500 text-white hover:bg-gray-400",
};

export default function Button({
  children,
  type = "default",
  className = "",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-secondary transition duration-300 text-sm uppercase tracking-wider font-semibold ${
        buttonStyles[type] || buttonStyles.default
      } ${className}`}
    >
      {children}
    </button>
  );
}
