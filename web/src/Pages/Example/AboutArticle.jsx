import { Card, Divider, Grid } from "@mui/material";
import Document from "../../components/examples/Icons/Document";
import DashboardLayout from "../../components/examples/LayoutContainers/DashboardLayout";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftBar from "./SoftBar";
import AddSideBar from "../Layout/AddSidebar";

const AboutArticle = () => {
  return (
    <AddSideBar>
      <SoftBar />
      <DashboardLayout>
        <SoftBox mt={4}>
          <SoftBox mb={1.5}>
            <Grid container>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={12} xl={12}>
                    <Card>
                      <SoftBox
                        p={2}
                        mx={3}
                        display="flex"
                        justifyContent="center"
                      >
                        <SoftBox
                          display="grid"
                          justifyContent="center"
                          alignItems="center"
                          bgColor={"primary"}
                          color="white"
                          width="10rem"
                          height="10rem"
                          shadow="md"
                          borderRadius="lg"
                          variant="gradient"
                        >
                          <Document size="80px" />
                        </SoftBox>
                      </SoftBox>
                      <SoftBox
                        pb={2}
                        px={2}
                        textAlign="center"
                        lineHeight={1.25}
                      >
                        <SoftTypography
                          variant="h1"
                          fontWeight="medium"
                          textTransform="capitalize"
                        >
                          Title
                        </SoftTypography>

                        <SoftTypography
                          variant="h5"
                          color="text"
                          fontWeigroutesht="regular"
                        >
                          Categorie
                        </SoftTypography>
                        <Divider />
                        <SoftTypography
                          variant="caption"
                          color="text"
                          fontWeight="regular"
                        >
                          Resusmer
                        </SoftTypography>
                        <Divider />

                        <SoftBox pt={1} pb={2} px={2}>
                          <SoftBox
                            component="ul"
                            display="flex"
                            flexDirection="column"
                            p={0}
                            m={0}
                          >
                            <SoftBox
                              component="li"
                              display="flex"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              bgColor="grey-100"
                              borderRadius="lg"
                              p={3}
                              mb={0}
                              mt={2}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: <p>xcsmkxcsl</p>,
                                }}
                              ></div>
                            </SoftBox>
                          </SoftBox>
                        </SoftBox>
                      </SoftBox>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </SoftBox>
        </SoftBox>
      </DashboardLayout>
    </AddSideBar>
  );
};

export default AboutArticle;
