import React from "react";

export const Radio = ({ value, checked, onChange, label }) => {
  return (
    <>
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      <label>{label}</label>
    </>
  );
};
