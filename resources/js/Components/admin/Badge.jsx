import { statusColors } from '@/utils';

const Badge = ({ status, className = "" }) => {
  return (
    <div
      className={`w-fit p-2 px-4 font-semibold font-secondary rounded-full uppercase tracking-wider ${
        statusColors[status?.id]
      } ${className}`}
    >
      {status?.name || "-"}
    </div>
  );
};

export default Badge;
