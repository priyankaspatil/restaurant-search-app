import React, { useReducer } from "react";
import helper from "../api/helper";

const ResultsContext = React.createContext();
const initialState = {
  term: "",
  results: [],
  errorMessage: "",
};

const resultsReducer = (state, action) => {
  //state === {term: string, results: array, errorMessage: string};
  //action === {type: 'fetch_results' || 'fetch_results' || 'set_error' || 'set_term', payload: {businesses , term}}
  switch (action.type) {
    case "fetch_results":
      return {
        ...state,
        results: action.payload.businesses,
        errorMessage: "",
      };

    case "set_error":
      return {
        ...state,
        results: action.payload.businesses,
        errorMessage: "Something went wrong!",
      };

    case "set_term":
      return {
        ...state,
        term: action.payload.term,
        results: action.payload.businesses,
        errorMessage: "",
      };

    default:
      return state;
  }
};

export const ResultsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resultsReducer, initialState);

  const handleSearchterm = async (searchTerm) => {
    try {
      const response = await helper.get("/businesses/search", {
        payload: {
          term: searchTerm,
          limit: 50,
          location: "san jose",
        },
      });
      dispatch({
        type: "fetch_results",
        payload: { businesses: response.data.businesses },
      });
    } catch (err) {
      dispatch({
        type: "set_error",
        payload: { businesses: [] },
      });
    }
  };

  const handleSetTerm = (term) => {
    dispatch({
      type: "set_term",
      payload: { businesses: [], term },
    });
  };

  const handleFetchResultsById = async (id) => {
    try {
      const response = await helper.get(`/businesses/${id}`);
      dispatch({
        type: "fetch_results",
        payload: { businesses: [response.data] },
      });
    } catch (err) {
      dispatch({
        type: "set_error",
        payload: { businesses: [] },
      });
    }
  };

  const handleFetchResults = async () => {
    const response = await helper.get("/businesses");
    dispatch({
      type: "fetch_results",
      payload: { businesses: response.data },
    });
  };

  return (
    <ResultsContext.Provider
      value={{
        data: state,
        handleSearchterm,
        handleSetTerm,
        handleFetchResultsById,
        handleFetchResults,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsContext;
