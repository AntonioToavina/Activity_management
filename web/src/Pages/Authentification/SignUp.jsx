import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import BasicLayout from "../Layout/BasicLayout";
import curved6 from "../../assets/images/curved-images/curved14.jpg";
import Separator from "../Layout/Separator";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import Socials from "../Layout/Socials";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";
import { Utilisateur } from "../../Model/Utilisateur";
import { getcontentBody } from "../../Model/Content";
import swal from "sweetalert";
import { redirectRouter } from "../../routes";

function SignUp() {
  const [utilisateur, setUtilisateur] = useState(new Utilisateur());
  const navigate = useNavigate();

  const sendLogin = async () => {
    const contentBody = getcontentBody();

    contentBody.method = "POST";
    contentBody.body = JSON.stringify(utilisateur);
    console.log(contentBody)
    await fetch("http://localhost:8080/utilisateurs/login", contentBody)
      .then((response) => response.json())
      .then((json) => {
        if ("error" in json)
          swal({
            title: "Error",
            text: json.error,
            icon: "error",
          });
        else {
          sessionStorage.setItem("user", JSON.stringify(json.data));
          navigate(redirectRouter());
        }
      });
  };

  return (
    <BasicLayout image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Authentification
          </SoftTypography>
        </SoftBox>

        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                setValue={setUtilisateur}
                value={utilisateur}
                field="email"
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                setValue={setUtilisateur}
                value={utilisateur}
                field="mdp"
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                actionB={sendLogin}
                variant="gradient"
                color="dark"
                fullWidth
              >
                sign up
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        <Separator />
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
