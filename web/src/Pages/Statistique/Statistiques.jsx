import { Table as MuiTable, TableBody, TableContainer, TableRow} from "@mui/material";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftTd from "../../components/SoftTd";
import {formatNumber} from "../../Model/Format";
import SoftButton from "../../components/SoftButton";
import borders from "../../assets/theme/base/borders";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import {Artistes} from "../../Model/Artistes";
import {useEffect, useState} from "react";
import SoftBar from "../Example/SoftBar";
import AddSideBar from "../Layout/AddSidebar";
import Diagram from "./Diagram";

const Statistiques=()=>{
    const { borderWidth } = borders;
    const headers = ["Nom", "recette", "Depense","Benefice avant taxe","Taxe","Benefice net"];
    const [devis,setDevis]=useState([])
    const [taxe,setTaxe]=useState([])

    const getData=async()=>{
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new Artistes());

        await fetch("http://localhost:8080/devis/find?page=0", content)
            .then((response) => response.json())
            .then((json) => {
                setDevis(json.data);
            });
    }

    const getTaxe=async()=>{
        const content = getBasicContent();
        content.method = "GET";

        await fetch("http://localhost:8080/taxes/3", content)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setTaxe(json.data);
            });
    }

    useEffect(() => {
        getData();
        getTaxe()
    }, []);

    return <AddSideBar>
        <SoftBar />
        <SoftBox position="relative">
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <SoftBox
                    sx={{
                        "& .MuiTableRow-root:not(:last-child)": {
                            "& td": {
                                borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                    `${borderWidth[1]} solid ${borderColor}`,
                            },
                        },
                    }}
                >
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
                                                    {row.libelle}
                                                </SoftTypography>
                                            </SoftTd>
                                            <SoftTd>
                                                <SoftTypography
                                                    variant="label"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                >
                                                    {formatNumber(row.recette)}
                                                </SoftTypography>
                                            </SoftTd>
                                            <SoftTd>
                                                <SoftTypography
                                                    variant="label"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                >
                                                    {formatNumber(row.total)}


                                                </SoftTypography>
                                            </SoftTd>
                                            <SoftTd>
                                                <SoftTypography
                                                    variant="label"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                >
                                                    {formatNumber(row.recette-row.total)}
                                                </SoftTypography>
                                            </SoftTd>
                                            <SoftTd>
                                                <SoftTypography
                                                    variant="label"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                >
                                                    {taxe?.pourcentage}
                                                </SoftTypography>
                                            </SoftTd>
                                            <SoftTd>
                                                <SoftTypography
                                                    variant="label"
                                                    color="secondary"
                                                    fontWeight="medium"
                                                >
                                                    {formatNumber(row.benefice_net)}
                                                </SoftTypography>
                                            </SoftTd>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </MuiTable>
                    </TableContainer>

                </SoftBox>
            </SoftBox>
            <SoftBox pt={3} pb={1} px={4} textAlign="center">
                <Diagram />
            </SoftBox>
        </SoftBox>
    </AddSideBar>

}

export default Statistiques
