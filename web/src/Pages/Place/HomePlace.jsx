import AddSideBar from "../Layout/AddSidebar";
import SoftBar from "../Example/SoftBar";
import SoftBox from "../../components/SoftBox";
import Card from "@mui/material/Card";
import SoftButton from "../../components/SoftButton";
import NewPlace from "./NewPlace";
import {useEffect, useState} from "react";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import {Artistes} from "../../Model/Artistes";
import ListesPlace from "./ListesPlace";
import {Lieu} from "../../Model/Lieu";

const HomePlace=()=>{
    const [open, setOpen] = useState(false);
    const [etat, setEtat] = useState(false);
    const [categories,setCategories]=useState([])
    const [lieux,setLieux]=useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const getData=async()=>{
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new Lieu());

        await fetch("http://localhost:8080/lieu/find?page=0", content)
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data)
                setLieux(json.data);
            });
    }

    const getOtherData=async ()=>{
        const content=getBasicContent()
        content.method = "GET";
        await fetch("http://localhost:8080/datas/lieu", content)
            .then((response) => response.json())
            .then((json) => {
                setCategories(json.data)
            });
    }

    useEffect(() => {
        getData();
        getOtherData()
    }, [etat]);


    return  <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <NewPlace
                    value={open}
                    setOpen={setOpen}
                    etat={etat}
                    setEtat={setEtat}
                   categories={categories}
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
                    <ListesPlace etat={etat} setEtat={setEtat} categories={categories} setPlace={setLieux} places={lieux} />
                    </Card>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </AddSideBar>
}

export default HomePlace