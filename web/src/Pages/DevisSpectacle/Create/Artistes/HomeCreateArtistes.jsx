import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import {Grid} from "@mui/material";
import Card from "@mui/material/Card";
import SoftButton from "../../../../components/SoftButton";
import FormArtistes from "./FormArtistes";
import {DepenseArtistes} from "../../../../Model/Devis";

const HomeCreateArtistes=({artistes,depenseartiste,setDepenseartiste})=>{

    const handleClickOpen = () => {
        setDepenseartiste([...depenseartiste, new DepenseArtistes()]);
    };

    return  <Grid item xs={12} md={6} xl={6}>
        <Card sx={{ minHeight: 350 }}>
            <SoftBox pt={2} px={2}>
                <SoftTypography variant="h5" fontWeight="bold">
                    Artistes
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
                depenseartiste.map((artiste,index)=>(
                    <FormArtistes artistes={artistes} depenses={depenseartiste} setDepenses={setDepenseartiste} index={index} key={"art"+index}  />
                ))
            }
        </Card>
    </Grid>
}

export default HomeCreateArtistes