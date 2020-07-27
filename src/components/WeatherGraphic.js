import React from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import createTooltipContent from "./TooltipContent";

const useStyle = makeStyles((theme) => ({
  container: {
    background: "rgba(255,255,255,0.7)",
  },
}));

const WeatherGraphic = ({ result, setWeatherShown }) => {
  const classes = useStyle();
  return (
    <LineChart
      width={800}
      height={200}
      data={result}
      margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip content={createTooltipContent(setWeatherShown, classes)} />
      <CartesianGrid stroke="#f5f5f5" />
      <Legend />
      <Line type="monotone" dataKey="temp" stroke="#ff7300" />
      <Line type="monotone" dataKey="feelsLike" stroke="#387908" />
    </LineChart>
  );
};

export default WeatherGraphic;
