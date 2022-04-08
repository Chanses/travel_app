import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import GoogleMapReact from "google-map-react";
import LocationOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import React from "react";
import useStyles from "./styles";
import { Rating } from "@material-ui/lab";

declare module "react" {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    lat?: number;
    lng?: number;
  }
}
interface IMap {
  coordinates: any;
  bounds: any;
  setCoordinates: any;
  setBounds: any;
  places: any;
  setChildClick: any;
}

const Map = (props: IMap) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDYVw_Z_T6zP7ulESPx1Tvw60WbYS-9kAc" }}
        defaultCenter={props.coordinates}
        center={props.coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        onChange={(event) => {
          props.setCoordinates({
            lat: event.center.lat,
            lng: event.center.lng,
          });
          props.setBounds({
            ne: event.marginBounds.ne,
            sw: event.marginBounds.sw,
          });
        }}
        onChildClick={(child: any) => {
          props.setChildClick(child);
        }}
      >
        {props.places?.map((place: any, index: number) => (
          <div
            className={classes.markerContainer}
            key={index}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {!isDesktop ? (
              <LocationOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Tom%27s_Restaurant%2C_NYC.jpg/640px-Tom%27s_Restaurant%2C_NYC.jpg"
                  }
                  alt={place.name}
                />
                <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
