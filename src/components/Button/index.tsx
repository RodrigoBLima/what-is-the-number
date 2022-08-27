import React,  { memo }  from "react";


interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled: boolean
}

/**
* Button component for reusable on all aplication
*/
function Button(props: ButtonProps) {
  const { label, disabled, onClick } = props;

  return (
    <button type="button" id="custom-buttom" onClick={onClick} disabled={disabled}>
      <span>{label}</span>
    </button>
  );
}

export default memo(Button);
