import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import {Grid} from "@mui/material";
import SoftInput from "../../../../components/SoftInput";
import {useEffect, useState} from "react";
import {DepenseArtistes} from "../../../../Model/Devis";
import SoftDataList from "../../../../components/SoftDataList";

const FormArtistes=({setDepenses,depenses,artistes,index})=>{
    const [depense,setDepense]=useState(new DepenseArtistes())

    useEffect(() => {
        const updatedItems = [...depenses];
        updatedItems[index] = depense;
        setDepenses(updatedItems);
    }, [depenses]);

    return <SoftBox p={2}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <SoftBox mb={2} >
                        <SoftTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Artiste
                        </SoftTypography>
                    <SoftDataList  data={artistes} setValue={setDepense} value={depense} fieldData={"nom"} fieldValue={"artistes"} />
                </SoftBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Duree
                    </SoftTypography>
                    <SoftInput  type="number" field="duree" value={depense} setValue={setDepense} />
                </SoftBox>
            </Grid>
        </Grid>
    </SoftBox>
}

export default FormArtistes