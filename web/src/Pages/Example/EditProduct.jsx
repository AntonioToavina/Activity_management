import { Card, CardMedia, Grid } from "@mui/material";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import AddSideBar from "../Layout/AddSidebar";
import SoftBar from "./SoftBar";
import image from "../../assets/images/home-decor-1.jpg";
import SoftEditor from "../../components/SoftEditor";
import SoftInput from "../../components/SoftInput";
import MiniCard from "./MiniCard";

const EditProfil = () => {
  return (
    <AddSideBar>
      <SoftBar />
      <SoftBox mt={5} mb={3}>
        <MiniCard />
      </SoftBox>

      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Card sx={{ minHeight: 450 }}>
              <SoftBox pt={2} px={2}>
                <SoftTypography variant="h5" fontWeight="bold">
                  Projects
                </SoftTypography>
              </SoftBox>

              <SoftBox pt={2} px={2}>
                <SoftBox
                  position="relative"
                  width="100.25%"
                  shadow="xl"
                  borderRadius="xl"
                >
                  <CardMedia
                    src={image}
                    component="img"
                    title="title"
                    sx={{
                      minHeight: 300,
                      maxWidth: "100%",
                      margin: 0,
                      boxShadow: ({ boxShadows: { md } }) => md,
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} xl={8}>
            <Card sx={{ minHeight: 350 }}>
              <SoftBox pt={2} px={2}>
                <SoftTypography variant="h5" fontWeight="bold">
                  Projects
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
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
    </AddSideBar>
  );
};

export default EditProfil;
