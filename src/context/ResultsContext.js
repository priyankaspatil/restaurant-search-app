import createDataContext from "./createDataContext";
import yelp from "../api/yelp";

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

const handleSearchterm = (dispatch) => {
  return async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
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
};

const handleSetTerm = (dispatch) => {
  return async (term) => {
    dispatch({
      type: "set_term",
      payload: { businesses: [], term },
    });
  };
};

const handleFetchResults = async (dispatch) => {
  return async (id) => {
    const response = await yelp.get(`/${id}`);
    dispatch({
      type: "fetch_results",
      payload: { businesses: response.data },
    });
  };
};

export const { Context, Provider } = createDataContext(
  resultsReducer,
  { handleSearchterm, handleSetTerm, handleFetchResults },
  initialState
);
