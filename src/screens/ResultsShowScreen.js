import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import ResultsContext from "../context/ResultsContext";

const ResultsShowScreen = ({ route }) => {
  const { data, handleFetchResultsById } = useContext(ResultsContext);
  const { results } = data;
  const id = route.params.id;
  const result = results[0];

  const getResult = (id) => {
    handleFetchResultsById(id);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!results) {
    return null;
  }
  console.log("ResultsShowScreen results ---------------->>>", results);

  return (
    <View>
      <Text>Name: {result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});

export default ResultsShowScreen;
