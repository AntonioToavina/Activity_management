/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "../../../../SoftBox";
import SoftTypography from "../../../../SoftTypography";

function MiniStatisticsCard({
  bgColor,
  title,
  count,
  percentage,
  icon,
  direction,
}) {
  return (
    <SoftBox bgColor={bgColor} variant="gradient">
      <SoftBox p={2}>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <SoftBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
              <SoftTypography
                variant="button"
                color={bgColor === "white" ? "text" : "white"}
                opacity={bgColor === "white" ? 1 : 0.7}
                textTransform="capitalize"
                fontWeight={title.fontWeight}
              >
                {title.text}
              </SoftTypography>
              <SoftTypography
                variant="h5"
                fontWeight="bold"
                color={bgColor === "white" ? "dark" : "white"}
              >
                {count}{" "}
                <SoftTypography
                  variant="button"
                  color={percentage.color}
                  fontWeight="bold"
                >
                  {percentage.text}
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </Grid>
          {direction === "right" ? (
            <Grid item xs={6}>
              <SoftBox
                variant="container"
                bgColor={bgColor === "white" ? icon.color : "white"}
                color={bgColor === "white" ? "white" : "dark"}
                width="15rem"
                height="4rem"
                marginLeft="auto"
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                shadow="md"
              >
                {icon.delai}
              </SoftBox>
            </Grid>
          ) : null}
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
    ]),
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
