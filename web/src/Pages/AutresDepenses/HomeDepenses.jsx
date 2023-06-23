import {useEffect, useState} from "react";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import {Artistes} from "../../Model/Artistes";
import SoftBar from "../Example/SoftBar";
import SoftBox from "../../components/SoftBox";
import Card from "@mui/material/Card";
import SoftButton from "../../components/SoftButton";
import ListesPlace from "../Place/ListesPlace";
import AddSideBar from "../Layout/AddSidebar";
import NewDepenses from "./NewDepenses";
import ListesDepense from "./ListesDepense";

const HomeDepenses=()=>{
    const [open, setOpen] = useState(false);
    const [etat, setEtat] = useState(false);
    const [depenses,setDepenses]=useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const getData=async()=>{
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new Artistes());

        await fetch("http://localhost:8080/autresdepenses/find?page=0", content)
            .then((response) => response.json())
            .then((json) => {
                setDepenses(json.data);
            });
    }


    useEffect(() => {
        getData();
    }, [etat]);
    return <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <NewDepenses
                    value={open}
                    setOpen={setOpen}
                    etat={etat}
                    setEtat={setEtat}
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
                                Nouvelle depense
                            </SoftButton>
                        </SoftBox>
                        <ListesDepense setDepenses={setDepenses} etat={etat} setEtat={setEtat} depenses={depenses} />
                    </Card>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </AddSideBar>
}

export default HomeDepenses