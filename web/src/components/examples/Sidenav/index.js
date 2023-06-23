import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard React components
import SoftBox from "../../SoftBox";
import SoftTypography from "../../SoftTypography";

// Soft UI Dashboard React examples
import SidenavCollapse from "../../examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "../../examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "../../examples/Sidenav/styles/sidenav";

// Soft UI Dashboard React context
import { useSoftUIController, setMiniSidenav } from "../../context";

function Sidenav({ brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/")[1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, code, title, noCollapse, key, route, href }) => {
      let returnValue;

      returnValue = (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            key={key}
            name={name}
            icon={icon}
            active={code === collapseName}
            noCollapse={noCollapse}
          />
        </NavLink>
      );

      return returnValue;
    }
  );
  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, miniSidenav }}
    >
      <SoftBox pt={3} pb={1} px={4} textAlign="center">
        <SoftBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <SoftTypography variant="h6" color="secondary">
            X
          </SoftTypography>
        </SoftBox>
        <SoftBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <SoftBox
              component="img"
              src={brand}
              alt="Soft UI Logo"
              width="2rem"
            />
          )}
          <SoftBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <SoftTypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
