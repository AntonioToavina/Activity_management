import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftButton from "../../../../components/SoftButton";
import FormElements from "./FormElements";
import {DepenseElements} from "../../../../Model/Devis";

const HomeElement=({elements,depenses,setDepenses})=>{
    const handleClickOpen = () => {
        setDepenses([...depenses, new DepenseElements()]);
    };

    return  <Grid item xs={12} md={6} xl={6}>
        <Card sx={{ minHeight: 350 }}>
            <SoftBox pt={2} px={2}>
                <SoftTypography variant="h5" fontWeight="bold">
                    Sonorisation et logistique
                </SoftTypography>
            </SoftBox>
            <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={3}
            >
                <SoftButton
                    color="success"
                    variant="contained"
                    actionB={handleClickOpen}
                >
                    Ajouter
                </SoftButton>
            </SoftBox>

            {
                depenses.map((artiste,index)=>(
                    <FormElements index={index} setDepenses={setDepenses} depenses={depenses} elements={elements} key={"el"+index} />
                ))
            }
        </Card>
    </Grid>
}

export default HomeElement