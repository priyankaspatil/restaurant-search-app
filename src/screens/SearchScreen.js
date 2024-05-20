import React, { useContext, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import ResultsContext from "../context/ResultsContext";
import ResultsList from "../components/ResultsList";

const SearchScreen = ({ navigation }) => {
  const { data, handleSearchterm, handleSetTerm, handleFetchResults } =
    useContext(ResultsContext);
  const { term, results, errorMessage } = data;

  const filterResultsByPrice = (price) => {
    //price === '$' || '$$' || '$$$'
    return results?.filter((result) => result?.price === price);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleFetchResults();
    });

    handleFetchResults();

    return unsubscribe;
  }, [navigation]);

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
