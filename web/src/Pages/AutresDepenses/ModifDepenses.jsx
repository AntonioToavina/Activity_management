import {Fragment, useEffect, useState} from "react";
import {getcontentBody} from "../../Model/Content";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";

const ModifDepenses=({value,setOpen,setEtat,etat,depenseS})=>{
    const [element,setElement]=useState(depenseS)

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setElement(depenseS);
    }, [depenseS, value]);

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "PUT";
        contentBody.body = JSON.stringify(element);

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
                        text: "Modification prise en compte",
                        icon: "success",
                    });
                    handleClose();
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
                        Modification depense
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

                                <SoftInput defaultVal={depenseS?.type} type={"text"}  setValue={setElement} value={element} field={"type"} />
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
                                Modifier
                            </SoftButton>
                        </SoftBox>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    </Fragment>
}

export default ModifDepenses