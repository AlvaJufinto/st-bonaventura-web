import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    disabled = false,
    ...props
  },
  ref
) {
  const input = ref ? ref : useRef();

  useEffect(() => {
    if (isFocused && !disabled) {
      input.current.focus();
    }
  }, [isFocused, disabled]);

  return (
    <input
      {...props}
      type={type}
      disabled={disabled}
      className={
        "border-gray-300 font-secondary rounded-md shadow-sm " +
        (disabled
          ? "bg-gray-100 text-gray-500 cursor-not-allowed "
          : "focus:border-indigo-500 focus:ring-indigo-500 ") +
        className
      }
      ref={input}
    />
  );
});
