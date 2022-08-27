import React from "react";

interface InputProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

/**
* Input component for reusable on all aplication
*/
function Input(props: InputProps) {
  const { value, name, id, placeholder, maxLength, onChange } = props;

  return (
    <div id="custom-input">
      <input
        name={name}
        id={id}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}
export default Input;
