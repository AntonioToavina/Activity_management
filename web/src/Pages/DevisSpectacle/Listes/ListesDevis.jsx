import {Grid, Table as MuiTable, TableBody, TableContainer, TableRow} from "@mui/material";
import SoftBox from "../../../components/SoftBox";
import SoftTypography from "../../../components/SoftTypography";
import SoftTd from "../../../components/SoftTd";
import {formatNumber} from "../../../Model/Format";
import SoftButton from "../../../components/SoftButton";
import borders from "../../../assets/theme/base/borders";
import {getBasicContent, getcontentBody} from "../../../Model/Content";
import {ElementBase} from "../../../Model/ElementBase";
import {useNavigate} from "react-router-dom";
import { useState} from "react";
import Placevendus from "../Placevendus";
import {PlaceVendus} from "../../../Model/PlaceVendus";
import FormulaireBis from "./FormulaireBis";

const ListesDevis=({devis,setDevis,etat,setEtat,places})=>{
    const navigate=useNavigate()
    const [devisS,setDevisS]=useState()
    const { borderWidth } = borders;
    const headers = ["Id", "Libelle", "Depense","Recette","Benefice","Benefice net"];
    const [open,setOpen]=useState(false)
    const [placevendu,setPlacevendu]=useState(new PlaceVendus())
    const [openB,setOpenB]=useState(false);
    const [iddevis,setIddevis]=useState()

    const handleClickOpen = (iddevis,id) => {
        setPlacevendu(places.filter((el)=> el.devis.id===iddevis)[0])
        setDevisS(devis[id]);
        setOpen(true);
    };

    const pagination = async (value) => {
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new ElementBase());
        await fetch(
            `http://localhost:8080/devis/find?page=${value}`,
            content
        )
            .then((response) => response.json())
            .then((json) => setDevis(json.data));
    };


    function viewDetails(id){
        navigate("/devis/modif/"+id)
    }

    function addBis(id){
        setIddevis(id)
        setOpenB(!openB)
    }



    const exportPDF=async(id)=>{
        const content = getBasicContent();
        content.method = "GET";
        const response = await fetch(
            `http://localhost:8080/devis/${id}/pdf`,
            content
        );

        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl);
    }

    return <SoftBox
        sx={{
            "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                },
            },
        }}
    >
        <FormulaireBis etat={etat} setEtat={setEtat} value={openB} setOpen={setOpenB} iddevis={iddevis}  />
        <Placevendus placevendus={placevendu}  devis={devisS} setOpen={setOpen} etat={etat} setEtat={setEtat} value={open} />
        <TableContainer>
            <MuiTable>
                <SoftBox component="thead">
                    <TableRow>
                        {headers.map((el, key) => {
                            return (
                                <SoftBox
                                    key={key}
                                    component="th"
                                    width={"auto"}
                                    pt={1.2}
                                    pb={1.25}
                                    pl={3}
                                    pr={10}
                                    textAlign="left"
                                    fontSize="12px"
                                    fontWeight={50}
                                    color="secondary"
                                    opacity={0.9}
                                    borderBottom={`${borderWidth[1]} solid `}
                                >
                                    <SoftTypography
                                        variant="button"
                                        color="text"
                                        fontWeight="bold"
                                    >
                                        {el.toUpperCase()}
                                    </SoftTypography>
                                </SoftBox>
                            );
                        })}
                    </TableRow>
                </SoftBox>
                <TableBody>
                    {devis?.map((row, key) => {
                        return (
                            <TableRow key={key}>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        {row.id}
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        {row.libelle}
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        {formatNumber(row.total.toFixed(2))}
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        {formatNumber(row.recette.toFixed(2))}
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        {formatNumber(row.benefice.toFixed(2))}
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        {formatNumber(row.benefice_net.toFixed(2))}
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        <SoftButton
                                            actionB={()=>viewDetails(row.id)}
                                            variant="contained"
                                            color="info"
                                            fullWidth
                                        >
                                            Voir
                                        </SoftButton>
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        <SoftButton
                                            actionB={()=>handleClickOpen(row.id,key)}
                                            variant="contained"
                                            color="success"
                                            fullWidth
                                        >
                                            Terminé
                                        </SoftButton>
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        <SoftButton
                                            actionB={()=>exportPDF(row.id)}
                                            variant="contained"
                                            color="warning"
                                            fullWidth
                                        >
                                            PDF
                                        </SoftButton>
                                    </SoftTypography>
                                </SoftTd>
                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        <SoftButton
                                            actionB={()=>addBis(row.id)}
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                        >
                                            Bis
                                        </SoftButton>
                                    </SoftTypography>
                                </SoftTd>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MuiTable>
        </TableContainer>
        <SoftBox py={4}>
            <SoftBox mb={1}>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={11} sm={9} md={5} xl={2}>
                        <SoftButton
                            actionB={() => pagination(-1)}
                            variant="outlined"
                            color="dark"
                            fullWidth
                        >
                            Previous
                        </SoftButton>
                    </Grid>
                    <Grid item xs={11} sm={9} md={5} xl={2}>
                        <SoftButton
                            actionB={() => pagination(1)}
                            variant="outlined"
                            color="dark"
                            fullWidth
                        >
                            Next
                        </SoftButton>
                    </Grid>
                </Grid>
            </SoftBox>
        </SoftBox>
    </SoftBox>
}

export default ListesDevis