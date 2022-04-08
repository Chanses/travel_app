import { CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

interface IBounds {
  sw: number;
  ne: number;
}

function App() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState<IBounds>({
    sw: 0,
    ne: 0,
  });
  const [childClicked, setChildClick] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("restaurants");
  const [rating, setRating] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place: any) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating, places]);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      if (data) setPlaces(data.data);
      setIsLoading(false);
    });
  }, [bounds, coordinates, type]);
  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            bounds={bounds}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClick={setChildClick}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
