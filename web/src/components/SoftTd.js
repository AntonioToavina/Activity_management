import borders from "../assets/theme/base/borders";
import SoftBox from "./SoftBox";
import SoftTypography from "./SoftTypography";

const SoftTd = ({ children }) => {
  const { borderWidth } = borders;
  return (
    <SoftBox
      component="td"
      pt={1.5}
      pb={1.25}
      pl={3}
      pr={10}
      textAlign={"left"}
      borderBottom={`${borderWidth[1]} solid `}
    >
      <SoftTypography
        variant="button"
        fontWeight="regular"
        color="secondary"
        sx={{
          display: "inline-block",
          width: "max-content",
        }}
      >
        {children ? children : null}
      </SoftTypography>
    </SoftBox>
  );
};

export default SoftTd;
