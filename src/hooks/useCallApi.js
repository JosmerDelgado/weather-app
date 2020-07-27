import { useCallback, useReducer, useEffect } from "react";
import axios from "axios";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action,
      };
    default:
      throw new Error();
  }
};

export const useCallAPI = (
  endpoint,
  { initialData = {}, callOnLoad = false } = {}
) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData,
  });
  const fetchData = useCallback(
    async (requestInit) => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(endpoint, {
          crossdomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          ...(requestInit || {}),
        });
        console.log("hola! :", result);
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", error });
      }
    },
    [endpoint]
  );

  useEffect(() => {
    if (callOnLoad) {
      fetchData();
    }
  }, [callOnLoad, fetchData]);

  return { ...state, requestData: fetchData };
};
