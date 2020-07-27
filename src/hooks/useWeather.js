import { useEffect, useState } from "react";
import { useCallAPI } from "./useCallApi";
import moment from "moment";
import { endpoints } from "../constants/api";

export const useWeather = () => {
  const appid = process.env.REACT_APP_APP_ID;
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherShown, setWeatherShown] = useState();
  const updateWeatherShown = (weather) => setWeatherShown(weather);
  const handleChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const [result, setResult] = useState();
  const { isLoading, isError, data: { data } = {}, requestData } = useCallAPI(
    endpoints.forecast
  );

  useEffect(() => {
    if (selectedCity) {
      requestData({ params: { q: selectedCity, appid, units: "metric" } });
    }
  }, [appid, requestData, selectedCity]);
  useEffect(() => {
    const newResult = data
      ? data.list.map((value) => ({
          temp: value.main.temp,
          feelsLike: value.main.feels_like,
          date: moment.unix(value.dt).format("DD/MM HH:00"),
          weather: value,
        }))
      : null;
    setResult(newResult);
    data && setWeatherShown(data.list[0]);
  }, [data]);

  return {
    handleChange,
    selectedCity,
    weatherShown,
    updateWeatherShown,
    result,
    isLoading,
    isError,
  };
};
