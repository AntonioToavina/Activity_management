import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftInput from "../../../../components/SoftInput";
import SoftButton from "../../../../components/SoftButton";
import {Fragment, useEffect, useState} from "react";
import SoftSelect from "../../../../components/SoftSelect";
import {getcontentBody} from "../../../../Model/Content";
import swal from "sweetalert";

const ModificationArtiste=({value,setOpen,elementS,datas,etat,setEtat})=>{
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
        await fetch("http://localhost:8080/depenseartistes", contentBody)
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
                        text: "Artiste modifié",
                        icon: "success",
                    });
                    handleClose();
                    setEtat(!etat)
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
                        Modification
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
                            <SoftBox mb={2} >
                                <SoftTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Artiste
                                </SoftTypography>
                                <SoftSelect value={element} setValue={setElement} defaultValue={elementS?.artistes?.id} data={datas} field={"artistes"} f_value={"id"} f_item={"nom"} />
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SoftBox mb={2}>
                                <SoftTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Duree
                                </SoftTypography>
                                <SoftInput defaultVal={elementS?.duree}  type="number" field="duree" value={element} setValue={setElement} />
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
                                Valider
                            </SoftButton>
                        </SoftBox>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    </Fragment>
}

export default ModificationArtiste