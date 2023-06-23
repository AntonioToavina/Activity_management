import SoftBar from "../../Example/SoftBar";
import AddSideBar from "../../Layout/AddSidebar";
import SoftBox from "../../../components/SoftBox";
import Card from "@mui/material/Card";
import ListesDevis from "./ListesDevis";
import {getBasicContent, getcontentBody} from "../../../Model/Content";
import {Artistes} from "../../../Model/Artistes";
import {useEffect, useState} from "react";

const HomeDevis=()=>{
    const [devis,setDevis]=useState([])
    const [etat,setEtat]=useState(false)
    const [places,setPlaces]=useState([])

    const getData=async()=>{
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new Artistes());

        await fetch("http://localhost:8080/devis/find?page=0", content)
            .then((response) => response.json())
            .then((json) => {
                setDevis(json.data);
            });
    }

    const getDatas=async()=>{
        const content = getBasicContent();
        content.method = "GET";
        await fetch(
            `http://localhost:8080/placesvendus`,
            content
        )
            .then((response) => response.json())
            .then((json) => setPlaces(json.data));
    }

    useEffect(() => {
        getData();
        getDatas()
    }, [etat]);

    return <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <SoftBox mb={3}>
                    <Card>
                        <ListesDevis places={places} etat={etat} setEtat={setEtat} devis={devis} setDevis={setDevis} />
                    </Card>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </AddSideBar>
}

export default HomeDevis