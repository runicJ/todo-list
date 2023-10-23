import React from "react";

export const Select = ({ values, labels, value, onChange }) => {
  if (values.length !== labels.length)
    throw new Error("values와 labels 매핑에 실패했습니다");

  const values_labels_map = values.map((value, index) => ({
    value,
    label: labels[index],
  }));

  return (
    <select value={value} onChange={onChange}>
      {values_labels_map.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
