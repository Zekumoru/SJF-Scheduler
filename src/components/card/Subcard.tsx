const Subcard = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => {
  return (
    <div className="grid grid-cols-auto-flow gap-x-1">
      <span className="material-icons row-span-2">{icon}</span>
      <span className="font-medium">{label}</span>
      <span className="text-lg">{value}</span>
    </div>
  );
};

export default Subcard;
