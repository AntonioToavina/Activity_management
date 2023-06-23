import { Card, Grid } from "@mui/material";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftButton from "../../components/SoftButton";
import SoftInput from "../../components/SoftInput";
import SoftEditor from "../../components/SoftEditor";
import SoftBar from "./SoftBar";
import AddSideBar from "../Layout/AddSidebar";

const FormLayout = () => {
  return (
    <AddSideBar>
      <SoftBar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card id="delete-account">
            <SoftBox
              pt={2}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftTypography
                variant="h3"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Payement
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
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
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
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                  <SoftBox mb={2}>
                    <SoftTypography
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Contenu
                    </SoftTypography>
                    <SoftEditor field="contenu" />
                  </SoftBox>
                </Grid>
              </Grid>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="info" fullWidth>
                  Create
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </AddSideBar>
  );
};

export default FormLayout;
