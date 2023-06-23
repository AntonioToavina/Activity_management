import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftSelect from "../../../../components/SoftSelect";
import SoftInput from "../../../../components/SoftInput";
import SoftButton from "../../../../components/SoftButton";
import {Fragment, useState} from "react";
import {getcontentBody} from "../../../../Model/Content";
import swal from "sweetalert";
import {Depensedivers} from "../../../../Model/Devis";

const AddDepense=({value,setOpen,datas,etat,setEtat,id})=>{
    const [element,setElement]=useState(new Depensedivers())
    const handleClose = () => {
        setOpen(false);
    };
    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify({...element,devis:{id:id}});
        await fetch("http://localhost:8080/diversdepenses", contentBody)
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
                        text: "Depense modifié",
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
                        Ajout depense
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
                                    Autres depenses
                                </SoftTypography>
                                <SoftSelect value={element} setValue={setElement} f_item={"type"} f_value={"id"} field={"typeDepenses"} data={datas}  />
                            </SoftBox>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SoftBox mb={2}>
                                <SoftTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Montant
                                </SoftTypography>
                                <SoftInput type="number" field="montant" value={element} setValue={setElement} />
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

export default AddDepense