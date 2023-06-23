import {Card, Grid} from "@mui/material";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftInput from "../../../../components/SoftInput";
import SoftButton from "../../../../components/SoftButton";
import {getcontentBody} from "../../../../Model/Content";
import swal from "sweetalert";

const ModifDevis=({devis,setDevis,setEtat,etat})=>{
    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "PUT";
        contentBody.body = JSON.stringify(devis);
        await fetch("http://localhost:8080/devis", contentBody)
            .then((response) => response.json())
            .then(async (json) => {
                if ("error" in json)
                    swal({
                        title: "Error",
                        text: json.error,
                        icon: "error",
                    });
                else {
                    swal({
                        title: "Success",
                        text: "Artiste crée",
                        icon: "success",
                    });
                    setEtat(!etat);
                }
            });
    };

    return  <Grid item xs={12} md={6} xl={6}>
        <Card sx={{ minHeight: 350 }}>
            <SoftBox pt={2} px={2}>
                <SoftTypography variant="h5" fontWeight="bold">
                    Spectacle
                </SoftTypography>
            </SoftBox>
            <SoftBox p={2}>
                <SoftBox mb={2} key={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Nom spectacle
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput defaultVal={devis?.libelle}  type="text" field="libelle" value={devis} setValue={setDevis} />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Date
                    </SoftTypography>
                    <SoftInput defaultVal={devis?.datedevis}  type="date" field="datedevis" value={devis} setValue={setDevis} />
                </SoftBox>
                <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                        <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Duree
                        </SoftTypography>
                    </SoftBox>
                    <SoftInput defaultVal={devis?.duree} type="number" field="duree" value={devis} setValue={setDevis} />
                </SoftBox>

                <Grid container justifyContent="center">
                    <Grid item xs={11} sm={8} md={5} xl={3}>
                        <SoftBox mt={1} mb={3}>
                            <SoftButton
                                actionB={sendData}
                                variant="gradient"
                                color="success"
                                fullWidth
                            >
                                Modifier
                            </SoftButton>
                        </SoftBox>
                    </Grid>
                </Grid>

            </SoftBox>
        </Card>
    </Grid>
}

export default ModifDevis