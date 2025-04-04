import { Link } from "@inertiajs/react";

export default function NavLink({
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <Link
      {...props}
      className={
        "font-secondary inline-flex items-center text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
        (active
          ? "bg-slate-100 rounded py-4 px-3 text-blue-800 font-semibold"
          : "py-4 px-3") +
        className
      }
    >
      {children}
    </Link>
  );
}
