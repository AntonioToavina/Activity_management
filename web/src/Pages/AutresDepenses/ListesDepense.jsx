import {useState} from "react";
import borders from "../../assets/theme/base/borders";
import {getBasicContent, getcontentBody} from "../../Model/Content";
import swal from "sweetalert";
import {TypeDepense} from "../../Model/TypeDepense";
import SoftBox from "../../components/SoftBox";
import {Grid, Table as MuiTable, TableBody, TableContainer, TableRow} from "@mui/material";
import SoftTypography from "../../components/SoftTypography";
import SoftTd from "../../components/SoftTd";
import SoftButton from "../../components/SoftButton";
import ModifDepenses from "./ModifDepenses";

const ListesDepense=({setDepenses,depenses,etat,setEtat})=>{
    const [open, setOpen] = useState(false);
    const { borderWidth } = borders;
    const [depense,setDepense]=useState(null)
    const headers = ["Id", "Nom"];

    const pagination = async (value) => {
        const content = getcontentBody();
        content.method = "POST";
        content.body = JSON.stringify(new TypeDepense());
        await fetch(
            `http://localhost:8080/autresdepenses/find?page=${value}`,
            content
        )
            .then((response) => response.json())
            .then((json) => setDepenses(json.data));
    };

    const handleClickOpen = (value) => {
        setDepense(value)
        setOpen(true);
    };

    const deleteDepense=async(id)=>{
        const content = getBasicContent();
        content.method = "DELETE";
        await fetch(
            `http://localhost:8080/autresdepenses/${id}`,
            content
        )
            .then((response) => response.json())
            .then((json) => {
                swal({
                    title: "Success",
                    text: "Depense supprimé",
                    icon: "success",
                });
                setEtat(!etat)
            });
    }

    return  <SoftBox
        sx={{
            "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                },
            },
        }}
    >
    <ModifDepenses etat={etat} setEtat={setEtat} setOpen={setOpen} value={open} depenseS={depense}  />
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
                    {depenses?.map((row, key) => {
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
                                        {row.type}
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
                                            actionB={() => deleteDepense(row.id)}
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

export default ListesDepense