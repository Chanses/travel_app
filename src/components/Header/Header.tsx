import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@react-google-maps/api";
import React, { Dispatch, SetStateAction, useState } from "react";
import useStyles from "./styles";

interface IHeader {
  setCoordinates: Dispatch<SetStateAction<{}>>;
}

const Header = (props: IHeader) => {
  const classes = useStyles();
  const [autoComplete, setAutoComplete] = useState<any>(null);
  const onLoad = (autoCmplt: any) => setAutoComplete(autoCmplt);
  const onPlaceChange = () => {
    const lat = autoComplete!.getPlace().geometry.location.lat();
    const lng = autoComplete!.getPlace().geometry.location.lng();
    props.setCoordinates({ lat, lng });
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel App
        </Typography>
        <Box display={"flex"}>
          <Typography variant="h6" className={classes.title}>
            Get new places
          </Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Enter the place"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
