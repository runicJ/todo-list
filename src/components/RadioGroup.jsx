import React from "react";
import { Radio } from "./Radio";

export const RadioGroup = ({ values, labels, value, onChange }) => {
  if (values.length !== labels.length)
    throw new Error("values와 labels 매핑에 실패했습니다");

  const values_labels_map = values.map((value, index) => ({
    value,
    label: labels[index],
  }));

  return (
    <>
      {values_labels_map.map((item) => (
        <Radio
          key={item.value}
          value={item.value}
          checked={value === item.value}
          label={item.label}
          onChange={onChange}
        />
      ))}
    </>
  );
};
