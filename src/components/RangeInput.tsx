import { useEffect, useId, useState } from 'react';

const RangeInput = ({
  min,
  max,
  step,
  label,
  value: initialValue,
  onChange,
}: {
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
}) => {
  const id = useId();
  const [value, setValue] = useState(initialValue ?? 1);
  const [valueText, setValueText] = useState(initialValue?.toString() ?? '1');

  useEffect(() => {
    const value = Number(valueText);
    if (min && value < min) return setValue(min);
    if (max && value > max) return setValue(max);
    setValue(value);
  }, [valueText, min, max]);

  useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return (
    <div>
      {label && <label htmlFor={`value-${id}`}>{label}</label>}
      <input
        type="range"
        id={`value-${id}`}
        onChange={(e) => {
          setValueText(e.target.value.toString());
          setValue(Number(e.target.value));
        }}
        value={value}
        step={step}
        min={min}
        max={max}
      />
      <input
        type="text"
        value={valueText}
        onChange={(e) => {
          if (
            e.target.value !== '' &&
            !/^(0(\.\d*)?|[1-9]\d*\.?\d*)$/.test(e.target.value)
          )
            return;
          setValueText(e.target.value);
        }}
      />
      {max && Number(valueText) > max && <span>Maximum is {max}.</span>}
    </div>
  );
};

export default RangeInput;
