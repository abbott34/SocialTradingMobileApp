import { StatusBar } from "expo-status-bar";
import React from "react";
import axios from "axios";

const serverUrl = "http://192.168.56.1:5000";
const http = axios.create({
  baseURL: serverUrl,
});

import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
  SafeAreaView,
  Button,
  Alert,
  Dimensions,
} from "react-native";
import { TextInput, FlatList } from "react-native-gesture-handler";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      messages: [],
    };
  }

  onLogin() {
    const { isLoggedIn, username } = this.state;
    if (!isLoggedIn) {
      http
        .post("/login", { username })
        .then(() => this.setState({ isLoggedIn: true }))
        .catch((err) => console.log(err));
    }
  }

  onMessageSend() {
    const { input, messages } = this.state;
    messages.push(input);
  }

  render() {
    const { messages, isLoggedIn } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text> to Financia Below </Text>
          <TextInput onChangeText={(val) => this.setState({ username: val })} />
          <Button title="Login" onPress={() => this.onLogin()} />
          <Text> Online Status: {isLoggedIn ? "Online" : "Offline"}</Text>
        </View>
        <FlatList
          data={messages}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
        <TextInput
          onChangeText={(val) => this.setState({ input: val })}
        ></TextInput>
        <Button title="Send Message" onPress={() => this.onMessageSend()} />
      </View>
    );
  }
}

// export default function App() {
//   const handlePress = () => console.log("Text Pressed");
//   console.log(require("./ReactFinancia/thumbnail_IMG_2596.jpg"));
//   console.log(Dimensions.get("screen"));

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Alerts */}
//       <Button
//         title="Click me"
//         onPress={() =>
//           // Alert.prompt("My Title", "My message", text=>console.log(text))
//           Alert.alert("My Title", "My Message", [
//             { text: "Yes", onPress: () => console.log("Yes") },
//             { text: "No", onPress: () => console.log("No") },
//           ])
//         }
//       ></Button>

//       {/* Buttons */}
//       <Button
//         title="Click Me"
//         onPress={() => console.log("Button Tapped")}
//         color="Orange"
//       ></Button>

//       {/* Text, Images, Touchables */}
//       <Text onPress={handlePress}>Hello World!</Text>
//       <TouchableWithoutFeedback onPress={() => console.log("Button Pressed")}>
//         <Image
//           source={require("./ReactFinancia/thumbnail_IMG_2596.jpg")}
//         ></Image>
//       </TouchableWithoutFeedback>
//       <StatusBar style="auto" />

//       {/*
//       Coding Project Now
//       */}
//     </SafeAreaView>
//   );
// }

// Styles
const orangeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
