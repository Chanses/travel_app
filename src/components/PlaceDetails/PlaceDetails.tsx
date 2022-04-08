import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import { Rating } from "@material-ui/lab";
import React from "react";
import useStyles from "./styles";

interface IPlaceDetails {
  place: any;
  selected: any;
  refProp: React.RefObject<HTMLInputElement>;
}

const PlaceDetails = (props: IPlaceDetails) => {
  if (props.selected)
    props.refProp?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  const classes = useStyles();
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          props.place.photo
            ? props.place.photo.images.large.url
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/640px-Tom%27s_Restaurant%2C_NYC.jpg"
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {props.place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating size="small" value={Number(props.place.rating)} readOnly />
          <Typography gutterBottom variant="subtitle2">
            {props.place.num_reviews} reviews
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2">Price</Typography>
          <Typography gutterBottom variant="subtitle2">
            {props.place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2">Rank</Typography>
          <Typography gutterBottom variant="subtitle2">
            {props.place.ranking}
          </Typography>
        </Box>
        {props.place?.awards?.map((award: any, index: number) => (
          <Box my={1} display="flex" justifyContent="space-between" key={index}>
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {props.place?.cuisine?.map((cuisine: any) => (
          <Chip
            key={cuisine.name}
            size="small"
            label={cuisine.name}
            className={classes.chip}
          ></Chip>
        ))}
        {props.place?.address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={classes.subtitle}
          >
            <LocationOnIcon /> {props.place.address}
          </Typography>
        )}
        {props.place?.phone && (
          <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.spacing}
          >
            <PhoneIcon /> {props.place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              window.open(props.place.web_url, "_blank");
            }}
          >
            Get More Info
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              window.open(props.place.website, "_blank");
            }}
          >
            WebSite
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
