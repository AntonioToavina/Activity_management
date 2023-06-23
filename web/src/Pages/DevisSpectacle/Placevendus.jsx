import {Fragment, useEffect, useState} from "react";
import {PlaceVendus} from "../../Model/PlaceVendus";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {Button, Grid} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftInput from "../../components/SoftInput";
import SoftButton from "../../components/SoftButton";


const Placevendus=({value,setOpen,setEtat,etat,devis,placevendus})=>{
    const [place,setPlace]=useState(new PlaceVendus())

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setPlace(placevendus)
        }, [placevendus,value]);

    const sendData = async () => {
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify({...place,devis:devis});
        await fetch("http://localhost:8080/placesvendus/create", contentBody)
            .then((response) => response.json())
            .then(async (json) => {
                if ("error" in json){
                    swal({
                        title: "Error",
                        text: json.error,
                        icon: "error",
                    });

                }

                else {
                    const content = getBasicContent();
                    content.method = "GET";
                    await fetch(`http://localhost:8080/devis/${devis.id}/beneficenet`, content);
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
                        Enregistrer les places vendues
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
                                    defaultVal={placevendus?.datefin}
                                    field={"datefin"}
                                    setValue={setPlace}
                                    type={"date"}
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
                                    defaultVal={placevendus?.vip_place}
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
                                    defaultVal={placevendus?.reserve_place}
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
                                    defaultVal={placevendus?.normal_place}
                                    field={"normal_place"}
                                    setValue={setPlace}
                                    type={"number"}
                                    value={place}
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

export default Placevendus