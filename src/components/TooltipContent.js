import React from "react";
import { Grid, Typography } from "@material-ui/core";

const createTooltipContent = (setWeatherShown, classes) => ({
  active,
  payload,
  label,
  ...args
}) => {
  if (active) {
    console.log({ args });
    const { payload: internPayload } = payload[0];
    setWeatherShown(internPayload.weather);
    return (
      <Grid className={classes.container}>
        <Typography>{`Date: ${label}`}</Typography>
        <Typography>{`Temp: ${internPayload.temp} Cº`}</Typography>
      </Grid>
    );
  }
  return null;
};

export default createTooltipContent;
