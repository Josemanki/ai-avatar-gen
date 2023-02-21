import React from "react";

type Props = {
  color?: string;
  image?: string;
  label: string;
  name: string;
  onChange?: () => void;
};

const RadioInput = ({ color, label, name, onChange }: Props) => {
  const checkedColor = color ? `bg-${color}-500` : "bg-secondary";

  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start space-x-3">
        <input
          type="radio"
          name={name}
          className={`radio checked:${checkedColor}`}
          onChange={onChange}
        />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default RadioInput;
