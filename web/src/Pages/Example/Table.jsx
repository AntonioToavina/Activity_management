import {
  Card,
  TableBody,
  TableContainer,
  TableRow,
  Table as MuiTable,
  Grid,
} from "@mui/material";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import borders from "../../assets/theme/base/borders";
import SoftBadge from "../../components/SoftBadge";
import SoftBar from "./SoftBar";
import AddSideBar from "../Layout/AddSidebar";
import Popup from "../Layout/Popup";
import { useState } from "react";
import SoftButton from "../../components/SoftButton";

const Table = () => {
  const { borderWidth } = borders;
  const headers = ["author", "function", "status", "employed"];
  const body = [
    {
      author: " John Micheal",

      function: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Manager
        </SoftTypography>
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="online"
          color="success"
          size="xs"
          container
        />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          23/04/18
        </SoftTypography>
      ),
    },
    {
      author: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Alexas
        </SoftTypography>
      ),
      function: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          Developer
        </SoftTypography>
      ),
      status: (
        <SoftBadge
          variant="gradient"
          badgeContent="offline"
          color="secondary"
          size="xs"
          container
        />
      ),
      employed: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          11/01/19
        </SoftTypography>
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <AddSideBar>
      <SoftBar />

      <Popup value={open} setOpen={setOpen} />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Authors table</SoftTypography>
              <SoftButton
                actionB={handleClickOpen}
                color="success"
                variant="contained"
                onClick={handleClickOpen}
              >
                New article
              </SoftButton>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <TableContainer>
                <MuiTable>
                  <SoftBox component="thead">
                    <TableRow>
                      {headers.map((el, key) => {
                        return (
                          <SoftBox
                            key={key}
                            component="th"
                            width={"auto"}
                            pt={1.5}
                            pb={1.25}
                            pl={3}
                            pr={35}
                            textAlign="left"
                            fontSize="15px"
                            fontWeight={700}
                            color="secondary"
                            opacity={0.7}
                            borderBottom={`${borderWidth[1]} solid `}
                          >
                            <SoftTypography
                              variant="button"
                              color="text"
                              fontWeight="medium"
                            >
                              {el.toUpperCase()}
                            </SoftTypography>
                          </SoftBox>
                        );
                      })}
                    </TableRow>
                  </SoftBox>
                  <TableBody>
                    {body.map((row, key) => {
                      const tables = headers.map((name, key) => {
                        return (
                          <SoftBox
                            component="td"
                            key={key}
                            pt={1.5}
                            pb={1.25}
                            pl={3}
                            pr={35}
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
                              {row[name]}
                            </SoftTypography>
                          </SoftBox>
                        );
                      });

                      return <TableRow key={key}>{tables}</TableRow>;
                    })}
                  </TableBody>
                </MuiTable>
              </TableContainer>
              <SoftBox py={4}>
                <SoftBox mb={1}>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={11} sm={9} md={5} xl={2}>
                      <SoftButton variant="outlined" color="dark" fullWidth>
                        Previous
                      </SoftButton>
                    </Grid>
                    <Grid item xs={11} sm={9} md={5} xl={2}>
                      <SoftButton variant="outlined" color="dark" fullWidth>
                        Next
                      </SoftButton>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </AddSideBar>
  );
};

export default Table;
