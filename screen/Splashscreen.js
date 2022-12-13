import * as React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Button,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import axios from "axios";
import { base_url } from "../utils/url";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const resetAction = CommonActions.reset({
  index: 0,
  routes: [{ name: "MainStackScreen" }],
});

class Splashscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      splashscreen_data: [],
    };
  }
  apiCall = () => {
    axios
      .get(base_url + "?page=2&limit=" + 1)
      .then((response) => {
        console.log(response.data);
        this.setState({ splashscreen_data: response.data });
      })
      .catch((e) => console.log(e));
  };
  componentDidMount() {
    this.apiCall();
    setTimeout(() => {
      this.props.navigation.navigate("Home");
    }, 5000);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        {this.state.splashscreen_data.map((item, index) => (
          <Image
          resizeMode="cover"
          
            key={index}
            source={{ uri: item.download_url }}
            style={styles.image}
          />
        ))}
        <Text style={styles.text}>Welcome</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
  },
  image: {
    // flex: 1,
    
    height: viewportWidth,
    width: viewportWidth,
    borderRadius: viewportWidth,
  },
  text: {
    color: "grey",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default Splashscreen;
