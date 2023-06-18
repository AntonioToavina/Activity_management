import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid } from "@mui/material";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";

export default function Popup({ value, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog fullWidth={true} maxWidth="md" open={value} onClose={handleClose}>
        <DialogContent>
          <SoftBox
            pt={2}
            px={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <SoftTypography
              variant="h4"
              fontWeight="bold"
              color="info"
              textGradient
            >
              Recherche
            </SoftTypography>
          </SoftBox>
          <SoftBox p={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2} key={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Title
                    </SoftTypography>
                  </SoftBox>

                  <SoftInput name="Title" type="text" field="title" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2} key={2}>
                  <SoftBox mb={1} ml={0.5}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Title
                    </SoftTypography>
                  </SoftBox>

                  <SoftInput name="Title" type="text" field="title" />
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
          <Grid container justifyContent="center">
            <Grid item xs={11} sm={8} md={5} xl={3}>
              <SoftBox mt={1} mb={3}>
                <SoftButton variant="gradient" color="info" fullWidth>
                  Rechercher
                </SoftButton>
              </SoftBox>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
