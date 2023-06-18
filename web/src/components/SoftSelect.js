import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const SoftSelect = ({
  data,
  f_value,

  f_item,
  setValue,
  value,
  field,
  label,
  defaultValue,
}) => {
  const [selectValue, setSelectValue] = useState("");

  const handleClick = (id) => {
    const dataChoosen = data?.filter((cat) => cat[f_value] === parseInt(id))[0];

    setValue({
      ...value,
      [field]: dataChoosen === undefined ? {} : dataChoosen,
    });
    setSelectValue(id);
  };

  return (
    <FormControl fullWidth>
      <Select
        displayEmpty
        value={defaultValue === undefined ? selectValue : defaultValue}
        onChange={(e) => handleClick(e.target.value)}
      >
        <MenuItem value="" sx={{ color: "text.secondary" }}>
          {label}
        </MenuItem>
        {data?.map((val, index) => (
          <MenuItem value={val[f_value]} key={index}>
            {val[f_item]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SoftSelect;
