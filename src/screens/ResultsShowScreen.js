import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
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

  return (
    <ScrollView>
      <View style={styles.background}>
        <Text style={styles.text}>Name: {result.name}</Text>
        <FlatList
          data={result.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => {
            return <Image style={styles.image} source={{ uri: item }} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    margin: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 300,
    marginBottom: 10,
  },
});

export default ResultsShowScreen;
