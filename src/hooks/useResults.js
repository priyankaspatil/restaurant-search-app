import { useEffect, useContext } from "react";
import ResultsContext from "../context/ResultsContext";

export default () => {
  const { data, handleSearchterm, handleSetTerm, handleFetchResultsById } =
    useContext(ResultsContext);

  const { term, results, errorMessage, loading } = data;

  useEffect(() => {
    handleSearchterm("pasta");
  }, []);

  return [
    term,
    results,
    errorMessage,
    loading,
    handleSearchterm,
    handleSetTerm,
    handleFetchResultsById,
  ];
};
