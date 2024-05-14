import { useEffect, useContext } from "react";
import { Context } from "../context/ResultsContext";

export default () => {
  const { data, handleSearchterm, handleSetTerm, handleFetchResults } =
    useContext(Context);

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
    handleFetchResults,
  ];
};
