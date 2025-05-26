const ToolbarButton = ({ icon, action, tooltip, formatKey, activeFormats }) => {
  const isActive = formatKey && activeFormats.has(formatKey);
  return (
    <button
      onClick={action}
      title={tooltip}
      aria-label={tooltip}
      className={`p-2 rounded transition-colors ${
        isActive
          ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {icon}
    </button>
  );
};

export default ToolbarButton;
