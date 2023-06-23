import {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftDataList from "../../../../components/SoftDataList";
import SoftInput from "../../../../components/SoftInput";
import {Depensedivers} from "../../../../Model/Devis";

const FormDepenses=({elements,setDepenses,depenses,index})=>{
    const [depense,setDepense]=useState(new Depensedivers())

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
                        Autres depenses
                    </SoftTypography>
                    <SoftDataList  data={elements} setValue={setDepense} value={depense} fieldData={"type"} fieldValue={"typeDepenses"} />
                </SoftBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Montant
                    </SoftTypography>
                    <SoftInput  type="number" field="montant" value={depense} setValue={setDepense} />
                </SoftBox>
            </Grid>
        </Grid>
    </SoftBox>
}

export default FormDepenses