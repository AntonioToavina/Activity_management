import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getBasicContent} from "../../../Model/Content";
import SoftBar from "../../Example/SoftBar";
import SoftBox from "../../../components/SoftBox";
import { Grid} from "@mui/material";
import AddSideBar from "../../Layout/AddSidebar";
import HomeArtistes_modif from "./Artistes/HomeArtistes_modif";
import HomeDepenses_modif from "./Depenses/HomeDepenses_modif";
import HomeElement_modif from "./Elements/HomeElement_modif";
import HomePlace_modif from "./Place/HomePlace_modif";
import ModifDevis from "./Devis/ModifDevis";
import MiniStatisticsCard from "../../../components/examples/Cards/StatisticsCards/MiniStatisticsCard";
import Document from "../../../components/examples/Icons/Document";

const ModifcationDevis=()=>{
    var {id}=useParams()
    const [etat, setEtat] = useState(false);
    const [devis,setDevis]=useState()
    const [depenseArtiste,setDepenseArtiste]=useState([])
    const [artistes,setArtistes]=useState([])

    const [elements,setElements]=useState([])
    const [depenseElement,setDepenseElement]=useState([])

    const [places,setPlaces]=useState([])
    const [depensePlace,setDepensePlace]=useState([])

    const [types,setTypes]=useState([])
    const [depenseDivers,setDepenseDivers]=useState([])

    const getData=async()=>{
        const content = getBasicContent();
        content.method = "GET";

        await fetch(`http://localhost:8080/devis/${id}/v_devis`, content)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setDevis({id:json.data.id,libelle: json.data.libelle,duree: json.data.duree,datedevis:json.data.datedevis ,total:json.data.total,benefice:json.data.benefice,recette:json.data.recette});
                setDepenseArtiste(json.data.depenseArtistesList)
                setDepenseElement(json.data.depenseElementsList)
                setDepensePlace(json.data.depenseLieuList)
                setDepenseDivers(json.data.depensediversList)
            });
    }

    const getDatas=async()=>{
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

    const syncData=async()=>{
        const content = getBasicContent();
        content.method = "GET";
        await fetch(`http://localhost:8080/devis/${id}/sync`, content);
    }

    const getStatistiques=()=>{

    }

    useEffect(() => {
        getData();
        getDatas();
        syncData();
    }, [etat]);

    return <AddSideBar>
        <SoftBar />
        <SoftBox mt={5} mb={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} xl={3}>
                    <MiniStatisticsCard
                        title={{ text: "Depense" }}
                        count={devis?.total}
                        percentage={""}
                        icon={{
                            color: "info",
                            component: <Document color="white" />,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                    <MiniStatisticsCard
                        title={{ text: "Recette" }}
                        count={devis?.recette}
                        percentage={""}
                        icon={{ color: "info", component: "public" }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                    <MiniStatisticsCard
                        title={{ text: "Benefice" }}
                        count={devis?.benefice}
                        percentage={""}
                        icon={{ color: "info", component: "emoji_events" }}
                    />
                </Grid>
            </Grid>
        </SoftBox>

        <SoftBox mt={5} mb={3}>
            <Grid container spacing={2}>
                {devis && <ModifDevis setDevis={setDevis} devis={devis} etat={etat} setEtat={setEtat} />}
                <HomeArtistes_modif id={id} etat={etat} setEtat={setEtat} setDepenseartiste={setDepenseArtiste} depenseartiste={depenseArtiste} artistes={artistes}  />
                <HomeDepenses_modif id={id} artistes={types} setEtat={setEtat} etat={etat} depenseartiste={depenseDivers} />
                <HomeElement_modif id={id} etat={etat} depenseartiste={depenseElement} setEtat={setEtat} artistes={elements} />
                <HomePlace_modif id={id} etat={etat} setEtat={setEtat} artistes={places} depenseartiste={depensePlace} />
            </Grid>

        </SoftBox>
    </AddSideBar>
}

export default ModifcationDevis