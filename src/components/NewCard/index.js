import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./style.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function RecipeReviewCard({ props }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="poster"
            src={`https://image.tmdb.org/t/p/w500${props.backdrop_path}`}
          />
        }
        title={
          <Typography sx={{ fontWeight: 500, fontSize: 16 }}>
            {props.original_title}
          </Typography>
        }
        subheader={props.release_date.split("-").reverse().join("-")}
      />
      <CardMedia
        id="cardMedia"
        component="img"
        image={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
        alt="backdrop"
      />
      <CardActions id="cardActions">
        <Typography
          sx={{
            fontWeight: 100,
            fontSize: 18,
            color: "#0288d1",
          }}
        >
          {props.vote_average}
        </Typography>
        <div id="overviewCardNew">
          <div>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              Overview
            </Typography>
          </div>
          <div>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div>
        </div>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography width="218px" sx={{ textAlign: "justify" }}>
            {props.overview}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
