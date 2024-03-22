const ToggleInput = ({
  label,
  toggled,
  onToggle,
}: {
  label?: string;
  toggled?: boolean;
  onToggle?: (toggled: boolean) => void;
}) => {
  return (
    <label className="inline-flex items-center me-5 cursor-pointer">
      <input
        type="checkbox"
        className="toggle"
        checked={toggled}
        onChange={() => onToggle?.(!toggled)}
      />
      <span className="ms-3">{label}</span>
    </label>
  );
};

export default ToggleInput;
