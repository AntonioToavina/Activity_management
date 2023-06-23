import {Fragment, useState} from "react";
import {getcontentBody} from "../../Model/Content";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftButton from "../../components/SoftButton";
import SoftInput from "../../components/SoftInput";
import {TypeDepense} from "../../Model/TypeDepense";

const NewDepenses=({value,setOpen,setEtat,etat})=>{
    const [depense,setDepense]=useState(new TypeDepense())

    const handleClose = () => {
        setOpen(false);
    };

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify(depense);
        await fetch("http://localhost:8080/autresdepenses", contentBody)
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
                        text: "Depense crée",
                        icon: "success",
                    });
                    handleClose();
                    setEtat(!etat);
                }
            });
    };


    return<Fragment>
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
                        Nouvelle depense
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
                                        Nom
                                    </SoftTypography>
                                </SoftBox>

                               <SoftInput type={"text"}  setValue={setDepense} value={depense} field={"type"} />
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

export default NewDepenses