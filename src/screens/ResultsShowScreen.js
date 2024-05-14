import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Context from "../context/ResultsContext";

const ResultsShowScreen = ({ route }) => {
  const { data, handleFetchResults } = useContext(Context);
  const { results } = data;
  const id = route.params.id;

  const getResult = (id) => {
    handleFetchResults(id);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!results) {
    return null;
  }

  return (
    <View>
      <Text>{results.name}</Text>
      <FlatList
        data={results.photos}
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
