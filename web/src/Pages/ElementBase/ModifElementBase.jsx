import {Fragment, useEffect, useState} from "react";
import {getcontentBody} from "../../Model/Content";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftSelect from "../../components/SoftSelect";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";

const ModifElementBase=({value,setOpen,setEtat,etat,elementS,typeelements,typemateriels})=>{
    const [element,setElement]=useState(elementS)

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setElement(elementS);
    }, [elementS, value]);

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "PUT";
        contentBody.body = JSON.stringify(element);

        await fetch("http://localhost:8080/elementbases", contentBody)
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
                        Ajout element de base
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

                                <SoftInput
                                    field={"nom"}
                                    setValue={setElement}
                                    type={"text"}
                                    value={element}
                                    defaultVal={elementS?.nom}
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
                                        Type de l'element
                                    </SoftTypography>
                                </SoftBox>

                                <SoftSelect defaultValue={elementS?.typeelements.id} label="Type element" f_item="element" data={typeelements} value={element} setValue={setElement} field={"typeelements"} f_value={"id"}  />
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
                                        Type materiel
                                    </SoftTypography>
                                </SoftBox>

                                <SoftSelect defaultValue={elementS?.typemateriels.id} label="Type element" f_item="type" data={typemateriels} value={element} setValue={setElement} field={"typemateriels"} f_value={"id"} />
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
                                        Tarif
                                    </SoftTypography>
                                </SoftBox>

                                <SoftInput
                                    defaultVal={elementS?.tarif}
                                    field={"tarif"}
                                    setValue={setElement}
                                    type={"text"}
                                    value={element}
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

export default ModifElementBase