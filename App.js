import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default App = () => {
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=2&limit=20")
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((e) => console.log(e));
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
