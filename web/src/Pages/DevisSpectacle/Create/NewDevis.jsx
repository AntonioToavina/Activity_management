import SoftBar from "../../Example/SoftBar";
import AddSideBar from "../../Layout/AddSidebar";
import SoftBox from "../../../components/SoftBox";
import {Card, Grid} from "@mui/material";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import {useEffect, useState} from "react";
import {Devis} from "../../../Model/Devis";
import HomeCreateArtistes from "./Artistes/HomeCreateArtistes";
import {getBasicContent, getcontentBody} from "../../../Model/Content";
import SoftButton from "../../../components/SoftButton";
import HomeElement from "./ElementBases/HomeElement";
import HomeCreatePlace from "./Place/HomeCreatePlace";
import HomeDiversDepenses from "./DiversDepenses/HomeDiversDepenses";
import swal from "sweetalert";

const NewDevis=()=>{
    const [devis,setDevis]=useState(new Devis())
    const [artistes,setArtistes]=useState([])
    const [depenseArtiste,setDepenseArtiste]=useState([])

    const [elements,setElements]=useState([])
    const [depenseElement,setDepenseElement]=useState([])

    const [places,setPlaces]=useState([])
    const [depensePlace,setDepensePlace]=useState([])

    const [types,setTypes]=useState([])
    const [depenseDivers,setDepenseDivers]=useState([])

    const getData=async()=>{
        const content = getBasicContent();
        content.method = "GET";

        await fetch("http://localhost:8080/datas/devis", content)
            .then((response) => response.json())
            .then((json) => {
                setPlaces(json.data[0]);
                setArtistes(json.data[1]);
                setElements(json.data[2])
                setTypes(json.data[3]);
            });
    }

    const sendData=async ()=>{
        const contentBody = getcontentBody();
        contentBody.method = "POST";
        contentBody.body = JSON.stringify({devis: devis, depenseLieus: depensePlace, artistes:depenseArtiste, depenseElements:depenseElement, depensedivers:depenseDivers});
        await fetch("http://localhost:8080/devis/create", contentBody)
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
                        text: "Devis pris en compte",
                        icon: "success",
                    });
                }
            });
    }

    useEffect(() => {
        getData();
    },[] );

    return   <AddSideBar>
        <SoftBar />
        <SoftBox mt={5} mb={3}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} xl={6}>
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
                                <SoftInput  type="text" field="libelle" value={devis} setValue={setDevis} />
                            </SoftBox>
                            <SoftBox mb={2}>
                                <SoftTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Date
                                </SoftTypography>
                                <SoftInput  type="date" field="datedevis" value={devis} setValue={setDevis} />
                            </SoftBox>
                            <SoftBox mb={2}>
                                <SoftTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Heure
                                </SoftTypography>
                                <SoftInput  type="time" field="heure" value={devis} setValue={setDevis} />
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
                                <SoftInput  type="number" field="duree" value={devis} setValue={setDevis} />
                            </SoftBox>

                        </SoftBox>
                    </Card>
                </Grid>
                <HomeCreateArtistes artistes={artistes} depenseartiste={depenseArtiste} setDepenseartiste={setDepenseArtiste}  />
                <HomeElement elements={elements} depenses={depenseElement} setDepenses={setDepenseElement} />
                <HomeCreatePlace elements={places} depenses={depensePlace} setDepenses={setDepensePlace} />
                <HomeDiversDepenses elements={types} depenses={depenseDivers} setDepenses={setDepenseDivers} />
            </Grid>

            <SoftBox p={2}>
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
            </SoftBox>

        </SoftBox>
    </AddSideBar>
}

export default NewDevis