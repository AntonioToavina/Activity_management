import { AppBar, Card, Grid, IconButton, Tab, Tabs } from "@mui/material";
import SoftBox from "../../components/SoftBox";
import { useEffect, useState } from "react";
import curved0 from "../../assets/images/curved-images/curved0.jpg";
import Cube from "../../components/examples/Icons/Cube";
import "../../routes";
import { getChildren, getIndice_Route } from "../../routes";
import { useLocation, useNavigate } from "react-router-dom";
import { navbarMobileMenu } from "../../components/examples/Navbars/DashboardNavbar/styles";
import { setMiniSidenav, useSoftUIController } from "../../components/context";

const SoftBar = () => {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const [tabValue, setTabValue] = useState(state?.numPage ?? 0);
  const route = getChildren(pathname.split("/")[1]);
  const [indice, setIndice] = useState(0);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav } = controller;

  const handleSetTabValue = (event, newValue) => {
    setTabValue(indice);
    navigate(route?.child[newValue].route, {
      state: { numPage: newValue },
    });
  };

  useEffect(() => {
    setIndice(getIndice_Route(pathname.split("/")[1]));
  }, [tabValue]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  return (
    <SoftBox position="relative">
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          sx={{ cursor: "pointer" }}
        >
          <IconButton
            size="small"
            color="inherit"
            sx={navbarMobileMenu}
            onClick={handleMiniSidenav}
          >
            X
          </IconButton>
        </SoftBox>
        <SoftBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="12.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({
              functions: { rgba, linearGradient },
              palette: { gradients },
            }) => ` url(${curved0})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        ></SoftBox>
      </SoftBox>

      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6} lg={4}>
            <AppBar position="static">
              <Tabs
                orientation="horizontal"
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}
              >
                {route?.child.map((r, index) => (
                  <Tab key={index} label={r.name} icon={<Cube />} />
                ))}
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
};

export default SoftBar;
