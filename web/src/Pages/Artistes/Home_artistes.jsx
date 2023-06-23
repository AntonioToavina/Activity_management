import AddSideBar from "../Layout/AddSidebar";
import SoftBar from "../Example/SoftBar";
import SoftBox from "../../components/SoftBox";
import NewArtistes from "./NewArtistes";
import {useState,useEffect} from "react";
import SoftButton from "../../components/SoftButton";
import Card from "@mui/material/Card";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import ListesArticles from "./ListesArticles";
import {Artistes} from "../../Model/Artistes";

const Home_artistes=()=>{
    const [open, setOpen] = useState(false);
    const [artistes,setArtistes]=useState([])
    const [etat, setEtat] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const getData=async()=>{
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new Artistes());

        await fetch("http://localhost:8080/artistes/find?page=0", content)
            .then((response) => response.json())
            .then((json) => {
                setArtistes(json.data);
            });
    }


    useEffect(() => {
        getData();
    }, [etat]);

    return   <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <NewArtistes
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
                                Nouvel artiste
                            </SoftButton>
                        </SoftBox>
                        <ListesArticles setArtistes={setArtistes} etat={etat} setEtat={setEtat} artistes={artistes} />
                    </Card>
                </SoftBox>
            </SoftBox>
        </SoftBox>
    </AddSideBar>
}

export default Home_artistes