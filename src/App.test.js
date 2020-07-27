import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

describe("App Tests", () => {
  it("renders app and check title", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/weather app/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("call api and fail", async () => {
    const { getByRole, getByText, getByTestId, debug } = render(<App />);
    const errorMessage = "Network Error";
    axios.mockImplementationOnce(() => Promise.reject(new Error()));
    fireEvent.mouseDown(getByText("Select City"));
    fireEvent.click(getByText("Madrid"));
    expect(getByRole("progressbar")).toBeInTheDocument();
    await wait(() => getByText(/Something went wrong please try again later/i));
    expect(
      getByText(/Something went wrong please try again later/i)
    ).toBeInTheDocument();
  });
});
