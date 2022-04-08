import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, {
  createRef,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles";

interface IList {
  places: any;
  childClicked: any;
  isLoading: boolean;
  type: string;
  rating: string;
  setType: Dispatch<SetStateAction<string>>;
  setRating: Dispatch<SetStateAction<string>>;
}

const List = (props: IList) => {
  const classes = useStyles();

  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(props.places?.length)
        .fill(null)
        .map((_, i) => refs[i] || createRef())
    );
  }, [props.places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Restoraunts, Hotels and Attractions</Typography>
      {props.isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />{" "}
        </div>
      ) : (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select
              value={props.type}
              onChange={(event) => props.setType(event.target.value as string)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select
              value={props.rating}
              onChange={(event) =>
                props.setRating(event.target.value as string)
              }
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>3+</MenuItem>
              <MenuItem value={4}>4+</MenuItem>
              <MenuItem value={4.5}>4.5+</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {props.places?.map((place: any, index: number) => (
              <Grid ref={elRefs[index]} key={index} item xs={12}>
                <PlaceDetails
                  selected={Number(props.childClicked) === index}
                  refProp={elRefs[index]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default List;
