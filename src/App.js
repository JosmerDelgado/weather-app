import React, { useState, useEffect } from "react";
import {
  Grid,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { useCallAPI } from "./hooks/useCallApi";

import moment from "moment";
import CitySelector from "./components/CitySelector";
import WeatherGraphic from "./components/WeatherGraphic";
import { selectableCities } from "./constants/cities";
import { useWeather } from "./hooks/useWeather";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5";

function App() {
  const {
    handleChange,
    selectedCity,
    weatherShown,
    updateWeatherShown,
    result,
    isLoading,
    isError,
  } = useWeather();

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Weather App</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Grid container>
          <Grid item>
            <CitySelector
              handleChange={handleChange}
              selectedCity={selectedCity}
            />
          </Grid>
          <Grid item>
            {isError && (
              <Typography variant="h6">
                Something went wrong please try again later
              </Typography>
            )}
            {selectedCity && isLoading && <CircularProgress />}
            {result && (
              <>
                <Typography variant="h6">
                  {
                    selectableCities.find((city) => city.value === selectedCity)
                      .text
                  }
                </Typography>
                <Typography>{`Date: ${moment
                  .unix(weatherShown.dt)
                  .format("DD/MM/YYYY HH:00")}`}</Typography>
                <Typography>{`Temperature: ${weatherShown.main.temp}`}</Typography>
                <Typography>{`Feels Like: ${weatherShown.main.feels_like}`}</Typography>
                <Typography>{`Humidity: ${weatherShown.main.humidity}`}</Typography>
                <Typography>{`Pressure: ${weatherShown.main.pressure}`}</Typography>
                <Typography>{`Temperature Max: ${weatherShown.main.temp_max}`}</Typography>
                <Typography>{`Temperature Min: ${weatherShown.main.temp_min}`}</Typography>
                {weatherShown.weather.length > 0 && (
                  <>
                    <Typography>{`Weather: ${weatherShown.weather[0].main}`}</Typography>
                    <Typography>{`Weather description: ${weatherShown.weather[0].description}`}</Typography>
                  </>
                )}
                <WeatherGraphic
                  result={result}
                  setWeatherShown={updateWeatherShown}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default App;
