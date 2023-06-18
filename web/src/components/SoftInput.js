import { TextField } from "@mui/material";

const SoftInput = ({
  placeholder,
  type,
  defaultVal,
  setValue,
  value,
  field,
  format,
}) => {
  const changeFormat = (e) => {
    const date = e.split("T", 2);
    return date[0] + " " + date[1];
  };

  const setdata = (e) => {
    if (type === "datetime-local") e = changeFormat(e);
    setValue({ ...value, [field]: e });
  };

  return (
    <TextField
      fullWidth
      type={type}
      placeholder={placeholder}
      defaultValue={defaultVal}
      format={format}
      onChange={(e) => setdata(e.target.value)}
    />
  );
};

export default SoftInput;
