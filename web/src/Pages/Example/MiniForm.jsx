import { Grid } from "@mui/material";
import SoftBox from "../../components/SoftBox";
import DashboardLayout from "../../components/examples/LayoutContainers/DashboardLayout";
import AddSideBar from "../Layout/AddSidebar";
import SoftBar from "./SoftBar";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftEditor from "../../components/SoftEditor";
import SoftButton from "../../components/SoftButton";

const Trajet = () => {
  return (
    <AddSideBar>
      <SoftBar />
      <DashboardLayout>
        <SoftBox mt={4}>
          <SoftBox mb={3}>
            <Grid container>
              <Grid item xs={12} md={6} xl={10}>
                <Card sx={{ minHeight: 350 }}>
                  <SoftBox
                    pt={2}
                    px={2}
                    mt={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <SoftTypography
                      variant="h3"
                      fontWeight="bold"
                      color="info"
                      textGradient
                    >
                      Nouveau trajet
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
                      </Grid>
                    </Grid>
                    <Grid container justifyContent={"center"}>
                      <Grid xs={11} sm={8} md={5} xl={6}>
                        <SoftBox mt={1} mb={3}>
                          <SoftButton variant="gradient" color="info" fullWidth>
                            Valider
                          </SoftButton>
                        </SoftBox>
                      </Grid>
                    </Grid>
                  </SoftBox>
                </Card>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>
      </DashboardLayout>
    </AddSideBar>
  );
};

export default Trajet;
