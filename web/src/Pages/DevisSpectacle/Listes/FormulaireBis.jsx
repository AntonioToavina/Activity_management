import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";
import {Fragment, useState} from "react";
import {Devis} from "../../../Model/Devis";
import {getcontentBody} from "../../../Model/Content";
import swal from "sweetalert";

const FormulaireBis=({value,setOpen,setEtat,etat,iddevis})=>{
    const [devis,setDevis]=useState(new Devis())
    const handleClose = () => {
        setOpen(false);
    };

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify(devis);
        await fetch(`http://localhost:8080/devis/${iddevis}/bis`, contentBody)
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
                        text: "Bis crée",
                        icon: "success",
                    });
                    setEtat(!etat);
                }
            });
    };

    return <Fragment>
        <Dialog fullWidth={true} maxWidth="md" open={value} onClose={handleClose}>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
            <DialogContent>
                <SoftBox
                    pt={2}
                    px={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <SoftTypography
                        variant="h4"
                        fontWeight="bold"
                        color="info"
                        textGradient
                    >
                       Duplication evenement
                    </SoftTypography>
                </SoftBox>

                <SoftBox
                    pt={2}
                    px={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SoftBox mb={2} key={2}>
                                <SoftBox mb={1} ml={0.5}>
                                    <SoftTypography
                                        component="label"
                                        variant="label"
                                        fontWeight="bold"
                                    >
                                        Date
                                    </SoftTypography>
                                </SoftBox>

                                <SoftInput
                                    field={"datedevis"}
                                    setValue={setDevis}
                                    type={"date"}
                                    value={devis}
                                />
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SoftBox mb={2} key={2}>
                                <SoftBox mb={1} ml={0.5}>
                                    <SoftTypography
                                        component="label"
                                        variant="label"
                                        fontWeight="bold"
                                    >
                                        Place vip
                                    </SoftTypography>
                                </SoftBox>

                                <SoftInput
                                    field={"heure"}
                                    setValue={setDevis}
                                    type={"time"}
                                    value={devis}
                                />
                            </SoftBox>
                        </Grid>
                    </Grid>
                </SoftBox>

                <Grid container justifyContent="center">
                    <Grid item xs={11} sm={8} md={5} xl={3}>
                        <SoftBox mt={1} mb={3}>
                            <SoftButton
                                actionB={sendData}
                                variant="gradient"
                                color="info"
                                fullWidth
                            >
                                Creer
                            </SoftButton>
                        </SoftBox>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    </Fragment>
}

export default FormulaireBis