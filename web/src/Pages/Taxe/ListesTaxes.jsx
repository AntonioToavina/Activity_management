import {useState} from "react";
import borders from "../../assets/theme/base/borders";
import {getBasicContent} from "../../Model/Content";
import swal from "sweetalert";
import {Grid, Table as MuiTable, TableBody, TableContainer, TableRow} from "@mui/material";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftTd from "../../components/SoftTd";
import SoftButton from "../../components/SoftButton";
import ModifTaxe from "./ModifTaxe";

const ListesTaxes=({etat,setEtat,taxes})=>{
    const [open, setOpen] = useState(false);
    const { borderWidth } = borders;
    const [taxe,setTaxe]=useState(null)
    const headers = ["Id", "Pourcentage"];

    const handleClickOpen = (value) => {
        setTaxe(value)
        setOpen(true);
    };

    const deletePlace=async(id)=>{
        const content = getBasicContent();
        content.method = "DELETE";
        await fetch(
            `http://localhost:8080/taxes/${id}`,
            content
        )
            .then((response) => response.json())
            .then((json) => {
                swal({
                    title: "Success",
                    text: "Taxes supprimé",
                    icon: "success",
                });
                setEtat(!etat)
            });
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
        <ModifTaxe etat={etat} setEtat={setEtat} setOpen={setOpen} value={open} taxeS={taxe} />
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
                    {taxes?.map((row, key) => {
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
                                        {row.pourcentage}
                                    </SoftTypography>
                                </SoftTd>

                                <SoftTd>
                                    <SoftTypography
                                        variant="label"
                                        color="secondary"
                                        fontWeight="medium"
                                    >
                                        <SoftButton
                                            actionB={() => handleClickOpen(row)}
                                            variant="contained"
                                            color="info"
                                            fullWidth
                                        >
                                            Modifier
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
                                            actionB={() => deletePlace(row.id)}
                                            variant="contained"
                                            color="error"
                                            fullWidth
                                        >
                                            Supprimer
                                        </SoftButton>
                                    </SoftTypography>
                                </SoftTd>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </MuiTable>
        </TableContainer>
    </SoftBox>
}

export default ListesTaxes