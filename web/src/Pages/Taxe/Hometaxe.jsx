import {useEffect, useState} from "react";
import SoftBar from "../Example/SoftBar";
import SoftBox from "../../components/SoftBox";
import Card from "@mui/material/Card";
import SoftButton from "../../components/SoftButton";
import AddSideBar from "../Layout/AddSidebar";
import CreateTaxe from "./CreateTaxe";
import {getBasicContent} from "../../Model/Content";
import ListesTaxes from "./ListesTaxes";

const Hometaxe=()=>{
    const [open, setOpen] = useState(false);
    const [etat, setEtat] = useState(false);
    const [taxes,setTaxes]=useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const getData=async()=>{
        const content = getBasicContent();
        content.method = "GET";

        await fetch("http://localhost:8080/taxes", content)
            .then((response) => response.json())
            .then((json) => {
                console.log(json.data)
                setTaxes(json.data);
            });
    }

    useEffect(() => {
        getData()
    }, [etat]);

    return <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <CreateTaxe
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
                                nouveau taxe
                            </SoftButton>
                        </SoftBox>
                        <ListesTaxes etat={etat} setEtat={setEtat} taxes={taxes} />
                    </Card>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </AddSideBar>
}
export default Hometaxe