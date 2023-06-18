import { useSoftUIController, setFixedNavbar } from "../../components/context";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/examples/LayoutContainers/DashboardLayout";
import Sidenav from "../../components/examples/Sidenav";
import brand from "../../assets/images/logo-ct.png";
import { useLocation } from "react-router-dom";
import { manageRoutes } from "../../routes";

const AddSideBar = ({ children }) => {
  const { pathname } = useLocation();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setFixedNavbar(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setFixedNavbar(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <>
      <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName="M i k o l o"
        routes={manageRoutes()}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default AddSideBar;
