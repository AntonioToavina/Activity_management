import { Button, Card, Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultInfoCard from "../../components/examples/Cards/InfoCards/DefaultInfoCard";
import SoftBox from "../../components/SoftBox";
import SoftTypography from "../../components/SoftTypography";
import SoftBar from "./SoftBar";
import SoftInput from "../../components/SoftInput";
import Document from "../../components/examples/Icons/Document";
import SoftButton from "../../components/SoftButton";
import AddSideBar from "../Layout/AddSidebar";
import Popup from "../Layout/Popup";

const ListesArticles = () => {
  const navigate = useNavigate();
  const [o_articles, setO_article] = useState([]);
  const [field_S, SetField_S] = useState({ title: "", idcat: "" });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [articles, setArticles] = useState([
    {
      title: "article1",
      categorie: {
        nomcategorie: "cat2",
      },
    },
    {
      title: "article2",
      categorie: {
        nomcategorie: "cat2",
      },
    },
    {
      title: "article3",
      categorie: {
        nomcategorie: "cat2",
      },
    },
  ]);

  const action = (articleChoosen) => {
    navigate("/articles/" + articleChoosen.slug, { state: { articleChoosen } });
  };

  const search = (val) => {
    var article_filtred = null;

    if (field_S.title === "" && field_S.idcat === "")
      article_filtred = o_articles;
    else {
      article_filtred = o_articles.filter((article) => {
        const title_matched =
          field_S.title === "" || article.title.includes(field_S.title);
        const cat_matched =
          article.categorie.id === parseInt(field_S.idcat) ||
          field_S.idcat === "";
        return title_matched && cat_matched;
      });
    }

    setArticles(article_filtred);
  };

  return (
    <AddSideBar>
      <SoftBar />

      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card id="delete-account">
            <Button variant="outlined" onClick={handleClickOpen}>
              Open max-width dialog
            </Button>
            <Popup value={open} setOpen={setOpen} />
            <SoftBox
              pt={2}
              px={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <SoftTypography
                variant="h4"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Recherche
              </SoftTypography>
            </SoftBox>
            <SoftBox p={2}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <SoftBox mb={2} key={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Title
                      </SoftTypography>
                    </SoftBox>

                    <SoftInput name="Title" type="text" field="title" />
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6}>
                  <SoftBox mb={2} key={2}>
                    <SoftBox mb={1} ml={0.5}>
                      <SoftTypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Title
                      </SoftTypography>
                    </SoftBox>

                    <SoftInput name="Title" type="text" field="title" />
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>
            <Grid container justifyContent="center">
              <Grid item xs={11} sm={8} md={5} xl={3}>
                <SoftBox mt={1} mb={3}>
                  <SoftButton variant="gradient" color="info" fullWidth>
                    Rechercher
                  </SoftButton>
                </SoftBox>
              </Grid>
            </Grid>
          </Card>
        </SoftBox>
      </SoftBox>
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                {articles.map((article, index) => (
                  <Grid item xs={12} key={index} md={6} xl={3}>
                    <DefaultInfoCard
                      InfoCard
                      icon={<Document size="30px" />}
                      title={article.title}
                      categorie={article.categorie.nomcategorie}
                      action={action}
                      article={article}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </AddSideBar>
  );
};

export default ListesArticles;
