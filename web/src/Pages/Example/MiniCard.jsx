import { Grid } from "@mui/material";
import MiniStatisticsCard from "../../components/examples/Cards/StatisticsCards/MiniStatisticsCard";
import Document from "../../components/examples/Icons/Document";

const MiniCard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} xl={3}>
        <MiniStatisticsCard
          title={{ text: "today's money" }}
          count="$53,000"
          percentage={{ color: "success", text: "+55%" }}
          icon={{
            color: "info",
            component: <Document color="white" />,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} xl={3}>
        <MiniStatisticsCard
          title={{ text: "today's users" }}
          count="2,300"
          percentage={{ color: "success", text: "+3%" }}
          icon={{ color: "info", component: "public" }}
        />
      </Grid>
      <Grid item xs={12} sm={6} xl={3}>
        <MiniStatisticsCard
          title={{ text: "new clients" }}
          count="+3,462"
          percentage={{ color: "error", text: "-2%" }}
          icon={{ color: "info", component: "emoji_events" }}
        />
      </Grid>
      <Grid item xs={12} sm={6} xl={3}>
        <MiniStatisticsCard
          title={{ text: "sales" }}
          count="$103,430"
          percentage={{ color: "success", text: "+5%" }}
          icon={{
            color: "info",
            component: "shopping_cart",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default MiniCard;
