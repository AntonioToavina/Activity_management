import {Fragment, useState} from "react";
import {Lieu} from "../../Model/Lieu";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid, TextField} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftSelect from "../../components/SoftSelect";
import SoftButton from "../../components/SoftButton";
import {getcontentBody} from "../../Model/Content";
import swal from "sweetalert";

const NewPlace=({value,setOpen,setEtat,etat,categories})=>{
    const [place,setPlace]=useState(new Lieu())

    const handleClose = () => {
        setOpen(false);
    };

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify(place);
        await fetch("http://localhost:8080/lieu", contentBody)
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
                        text: "Place crée",
                        icon: "success",
                    });
                    handleClose();
                    setEtat(!etat);
                }
            });
    };

    const handleFileChange=(event)=>{
        const file =event.target.files[0]
        const reader=new FileReader()

        reader.onload=(e)=>{
            const base64String =e.target.result;
            setPlace({...place, photo: base64String})

        }
        reader.readAsDataURL(file);
    }

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
                        Nouvelle place
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
                                              }) => ` url(${place.photo})`,
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
                                    setValue={setPlace}
                                    type={"text"}
                                    value={place}
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
                                    field={"vip_place"}
                                    setValue={setPlace}
                                    type={"number"}
                                    value={place}
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
                                        Place reservé
                                    </SoftTypography>
                                </SoftBox>

                                <SoftInput
                                    field={"reserve_place"}
                                    setValue={setPlace}
                                    type={"number"}
                                    value={place}
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
                                        Place normal
                                    </SoftTypography>
                                </SoftBox>

                                <SoftInput
                                    field={"normal_vip"}
                                    setValue={setPlace}
                                    type={"number"}
                                    value={place}
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
                                        Categorie
                                    </SoftTypography>
                                </SoftBox>

                                <SoftSelect label="Categorie" f_item="type" data={categories} value={place} setValue={setPlace} field={"categorieLieu"} f_value={"id"} />
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

export default NewPlace