import {Button, Grid, TextField} from "@mui/material";
import SoftInput from "../../components/SoftInput";
import {Fragment, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftButton from "../../components/SoftButton";
import DialogContent from "@mui/material/DialogContent";
import {Artistes} from "../../Model/Artistes";
import {getcontentBody} from "../../Model/Content";
import swal from "sweetalert";

const NewArtistes=({value,setOpen,etat,setEtat})=>{
    const [artiste,setArtiste]=useState(new Artistes())

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange=(event)=>{
        const file =event.target.files[0]
        const reader=new FileReader()

        reader.onload=(e)=>{
            const base64String =e.target.result;
            setArtiste({...artiste, photo: base64String})

        }
        reader.readAsDataURL(file);
    }

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify({...artiste,frequence: 1});
        await fetch("http://localhost:8080/artistes", contentBody)
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
                    handleClose();
                    setEtat(!etat);
                }
            });
    };

    return  <Fragment>
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
                        Creation laptop
                    </SoftTypography>
                </SoftBox>
                <SoftBox
                    position="relative"
                    width="100.25%"
                    shadow="xl"
                    borderRadius="xl"
                >
                    <SoftBox
                        display="flex"
                        alignItems="center"
                        position="relative"
                        minHeight="12.75rem"
                        borderRadius="xl"
                        sx={{
                            backgroundImage: ({
                                                  functions: { rgba, linearGradient },
                                                  palette: { gradients },
                                              }) => ` url(${artiste?.photo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "100%",
                            overflow: "hidden",
                        }}
                    ></SoftBox>

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
                                    setValue={setArtiste}
                                    type={"text"}
                                    value={artiste}
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
                                        Photo
                                    </SoftTypography>
                                </SoftBox>

                                <TextField
                                    fullWidth
                                    type={"file"}
                                    onChange={handleFileChange}
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
                                        Tarif par heure
                                    </SoftTypography>
                                </SoftBox>

                                <SoftInput
                                    field={"tarif_heure"}
                                    setValue={setArtiste}
                                    type={"text"}
                                    value={artiste}
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

export default NewArtistes