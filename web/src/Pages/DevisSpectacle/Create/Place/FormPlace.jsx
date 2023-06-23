import {useEffect, useState} from "react";
import {DepenseElements} from "../../../../Model/Devis";
import SoftBox from "../../../../components/SoftBox";
import {Grid} from "@mui/material";
import SoftTypography from "../../../../components/SoftTypography";
import SoftDataList from "../../../../components/SoftDataList";
import SoftInput from "../../../../components/SoftInput";

const FormPlace=({elements,setDepenses,depenses,index})=>{
    const [depense,setDepense]=useState(new DepenseElements())

    useEffect(() => {
        const updatedItems = [...depenses];
        updatedItems[index] = depense;
        setDepenses(updatedItems);
    }, [depenses]);

    return  <SoftBox p={2}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <SoftBox mb={2} >
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Place
                    </SoftTypography>
                    <SoftDataList  data={elements} setValue={setDepense} value={depense} fieldData={"nom"} fieldValue={"lieu"} />
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
            <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Place vip
                    </SoftTypography>
                    <SoftInput  type="number" field="prix_vip" value={depense} setValue={setDepense} />
                </SoftBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Place reservé
                    </SoftTypography>
                    <SoftInput  type="number" field="prix_reserve" value={depense} setValue={setDepense} />
                </SoftBox>
            </Grid>
            <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                    <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                    >
                        Place normal
                    </SoftTypography>
                    <SoftInput  type="number" field="prix_normal" value={depense} setValue={setDepense} />
                </SoftBox>
            </Grid>
        </Grid>
    </SoftBox>
}
export default FormPlace