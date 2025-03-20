export default function Button({ children, onClick, className = "" }) {
  return (
    <div
      className={`font-secondary text-white bg-b300 uppercase text-xl font-semibold flex items-center justify-center h-20 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
