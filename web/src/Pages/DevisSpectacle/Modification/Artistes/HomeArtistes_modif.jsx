import {Grid, Table as MuiTable, TableBody, TableContainer, TableRow} from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import SoftTd from "../../../../components/SoftTd";
import borders from "../../../../assets/theme/base/borders";
import SoftButton from "../../../../components/SoftButton";
import {useState} from "react";
import ModificationArtiste from "./ModificationArtiste";
import {getBasicContent} from "../../../../Model/Content";
import swal from "sweetalert";
import AddArtites from "./AddArtites";

const HomeArtistes_modif=({artistes,depenseartiste,setEtat,etat,id})=>{
    const [open, setOpen] = useState(false);
    const [openS, setOpenS] = useState(false);
    const { borderWidth } = borders;
    const headers = ["Id", "Artiste", "Durée"];
    const [element,setElement]=useState({});

    const handleClickOpen = (value) => {
        setElement(value)
        setOpen(true);
    };

    const handleAdding=(value)=>{
        setOpenS(true);
    }

    const deleteElement=async(id)=>{
        const content = getBasicContent();
        content.method = "DELETE";
        await fetch(
            `http://localhost:8080/depenseartistes/${id}`,
            content
        )
            .then((response) => response.json())
            .then((json) => {
                swal({
                    title: "Success",
                    text: "Artiste supprimé",
                    icon: "success",
                });
                setEtat(!etat)
            });
    }

    return <Grid item xs={12} md={6} xl={6}>
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
                    actionB={handleAdding}
                >
                    Ajouter
                </SoftButton>
            </SoftBox>

            <AddArtites id={id} etat={etat} value={openS} setOpen={setOpenS} setEtat={setEtat} datas={artistes}  />
            <ModificationArtiste setEtat={setEtat} etat={etat} datas={artistes} value={open} setOpen={setOpen} elementS={element} />

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
                                            pr={5}
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
                            {depenseartiste?.map((row, key) => {
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
                                                {row.artistes.nom}
                                            </SoftTypography>
                                        </SoftTd>
                                        <SoftTd>
                                            <SoftTypography
                                                variant="label"
                                                color="secondary"
                                                fontWeight="medium"
                                            >
                                                {row.duree}
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
                                                    actionB={() => deleteElement(row.id)}
                                                    variant="contained"
                                                    color="error"
                                                    fullWidth
                                                >
                                                    Del
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
        </Card>
    </Grid>
}

export default HomeArtistes_modif