import SoftBar from "../Example/SoftBar";
import SoftBox from "../../components/SoftBox";
import NewArtistes from "../Artistes/NewArtistes";
import Card from "@mui/material/Card";
import SoftButton from "../../components/SoftButton";
import AddSideBar from "../Layout/AddSidebar";
import {useEffect, useState} from "react";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import {Artistes} from "../../Model/Artistes";
import CreateElement from "./CreateElement";
import ListesElementsBase from "./ListesElementsBase";

const HomeElementBase=()=>{
    const [open, setOpen] = useState(false);
    const [typeelements,setTypeelements]=useState([])
    const [typemateriels,setTypemateriels]=useState([])
    const [elementbases,setElementbases]=useState([])
        const [etat, setEtat] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const getData=async()=>{
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new Artistes());

        await fetch("http://localhost:8080/elementbases/find?page=0", content)
            .then((response) => response.json())
            .then((json) => {
                setElementbases(json.data);
            });
    }

    const getOtherData=async ()=>{
        const content=getBasicContent()
        content.method = "GET";
        await fetch("http://localhost:8080/datas/elementsbase", content)
            .then((response) => response.json())
            .then((json) => {
                setTypeelements(json[0])
                setTypemateriels(json[1])
            });
    }


    useEffect(() => {
        getData();
        getOtherData()
    }, [etat]);

    return <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <CreateElement
                    value={open}
                    setOpen={setOpen}
                    etat={etat}
                    setEtat={setEtat}
                    typeelements={typeelements}
                    typemateriels={typemateriels}
                />
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={3}
                        >
                            <SoftButton
                                actionB={handleClickOpen}
                                color="success"
                                variant="contained"
                                onClick={handleClickOpen}
                            >
                                nouvel element
                            </SoftButton>
                        </SoftBox>
                        <ListesElementsBase etat={etat} setEtat={setEtat} elements={elementbases} setElements={setElementbases}  typeelements={typeelements} typemateriels={typemateriels}  />
                    </Card>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </AddSideBar>
}

export default HomeElementBase