import React from "react";
import { Select, MenuItem } from "@material-ui/core";
import { selectableCities } from "../constants/cities";

const CitySelector = ({ handleChange, selectedCity }) => {
  return (
    <Select
      onChange={handleChange}
      value={selectedCity}
      displayEmpty
      inputProps={{ "data-testid": "citySelector" }}
    >
      <option value="" disabled>
        Select City
      </option>
      {selectableCities.map((city) => (
        <option key={city.value} value={city.value}>
          {city.text}
        </option>
      ))}
    </Select>
  );
};

export default CitySelector;
