import { Autocomplete, TextField } from "@mui/material";

const SoftDataList = ({ data, setValue, value, fieldData, fieldValue }) => {
  const handleValue = (val) => {
    const newValue = data.filter((v) => v[fieldData] === val)[0];
    setValue({ ...value, [fieldValue]: newValue });
  };

  return (
    <Autocomplete
      disablePortal
      fullWidth
      id="combo-box-demo"
      options={data}
      getOptionLabel={(option) => option[fieldData]}
      onInputChange={(event, newInputValue) => {
        handleValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

export default SoftDataList;
