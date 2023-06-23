import {Grid} from "@mui/material";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftDataList from "../../../../components/SoftDataList";
import SoftInput from "../../../../components/SoftInput";
import {useEffect, useState} from "react";
import { DepenseElements} from "../../../../Model/Devis";

const FormElements=({elements,setDepenses,depenses,index})=>{
    const [depense,setDepense]=useState(new DepenseElements())

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
                        Elements
                    </SoftTypography>
                    <SoftDataList  data={elements} setValue={setDepense} value={depense} fieldData={"nom"} fieldValue={"elementbases"} />
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

export default FormElements