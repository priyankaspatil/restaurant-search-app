import React, { useContext } from "react";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import SearchBar from "../components/SearchBar";
import Context from "../context/ResultsContext";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const { data, handleSearchterm, handleSetTerm } = useContext(Context);
  const { term, results, errorMessage, loading } = data;

  const filterResultsByPrice = (price) => {
    //price === '$' || '$$' || '$$$'
    return results.filter((result) => result.price === price);
  };

  useEffect(() => {
    handleSearchterm("pasta");
  }, []);

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={(text) => handleSetTerm(text)}
        onTermSubmit={() => handleSearchterm(term)}
      />
      {errorMessage ? <Text>Something Went Wrong</Text> : null}
      <ScrollView>
        <ResultsList
          title="Cost Effective"
          results={filterResultsByPrice("$")}
        />
        <ResultsList title="Bit Pricier" results={filterResultsByPrice("$$")} />
        <ResultsList
          title="Big Spender"
          results={filterResultsByPrice("$$$")}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
