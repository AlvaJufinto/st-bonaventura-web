export default function InputLabel({
  value,
  className = "",
  children,
  ...props
}) {
  return (
    <label
      {...props}
      className={
        `block font-medium text-sm text-gray-700 font-secondary` + className
      }
    >
      {value ? value : children}
    </label>
  );
}
