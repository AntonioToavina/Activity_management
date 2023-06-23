import {Grid, Table as MuiTable, TableBody, TableContainer, TableRow} from "@mui/material";
import Card from "@mui/material/Card";
import SoftBox from "../../../../components/SoftBox";
import SoftTypography from "../../../../components/SoftTypography";
import {useState} from "react";
import borders from "../../../../assets/theme/base/borders";
import {getBasicContent} from "../../../../Model/Content";
import swal from "sweetalert";
import SoftTd from "../../../../components/SoftTd";
import SoftButton from "../../../../components/SoftButton";
import ModifPlace from "./ModifPlace";
import {formatNumber} from "../../../../Model/Format";
import AddPlace from "./AddPlace";

const HomePlace_modif=({artistes,depenseartiste,setEtat,etat,id})=>{
    const [open, setOpen] = useState(false);
    const { borderWidth } = borders;
    const [openS, setOpenS] = useState(false);
    const headers = ["Id", "Place", "Montant","VIP","Reserve","Normal"];
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
            `http://localhost:8080/depensesplaces/${id}`,
            content
        )
            .then((response) => response.json())
            .then((json) => {
                swal({
                    title: "Success",
                    text: "Place supprimé",
                    icon: "success",
                });
                setEtat(!etat)
            });
    }

    return <Grid item xs={12} md={6} xl={6}>
        <Card sx={{ minHeight: 350 }}>
            <SoftBox pt={2} px={2}>
                <SoftTypography variant="h5" fontWeight="bold">
                  Places
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

            <ModifPlace setEtat={setEtat} etat={etat} datas={artistes} value={open} setOpen={setOpen} elementS={element} />
            <AddPlace etat={etat} datas={artistes} value={openS} setEtat={setEtat} setOpen={setOpenS} id={id} />
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
                                                {row.lieu.nom}
                                            </SoftTypography>
                                        </SoftTd>
                                        <SoftTd>
                                            <SoftTypography
                                                variant="label"
                                                color="secondary"
                                                fontWeight="medium"
                                            >
                                                {formatNumber(row.montant)}
                                            </SoftTypography>
                                        </SoftTd>
                                        <SoftTd>
                                            <SoftTypography
                                                variant="label"
                                                color="secondary"
                                                fontWeight="medium"
                                            >
                                                {formatNumber(row.prix_vip)}
                                            </SoftTypography>
                                        </SoftTd>
                                        <SoftTd>
                                            <SoftTypography
                                                variant="label"
                                                color="secondary"
                                                fontWeight="medium"
                                            >
                                                {formatNumber(row.prix_reserve)}
                                            </SoftTypography>
                                        </SoftTd>
                                        <SoftTd>
                                            <SoftTypography
                                                variant="label"
                                                color="secondary"
                                                fontWeight="medium"
                                            >
                                                {formatNumber(row.prix_normal)}
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
export default HomePlace_modif