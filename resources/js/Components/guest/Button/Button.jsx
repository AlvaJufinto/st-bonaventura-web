export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      className={`font-secondary cursor-pointer text-white bg-b300 uppercase text-sm font-semibold flex items-center justify-center h-20 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
