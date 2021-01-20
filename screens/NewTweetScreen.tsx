import * as React from "react";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProfilePicture from "../components/ProfilePicture";
import { useState } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createTweet } from "../graphql/mutations";
import { useNavigation } from "@react-navigation/native";

export default function NewTweetScreen() {
  const [tweet, setTweet] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigation = useNavigation();

  const onPostTweet = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const newTweet = {
        content: tweet,
        image: imageUrl,
        userID: currentUser.attributes.sub,
      };

      await API.graphql(graphqlOperation(createTweet, { input: newTweet }));
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name={"close"} size={30} color={Colors.light.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPostTweet}>
          <Text style={styles.buttonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
        <ProfilePicture
          size={50}
          image={
            "data:image/jpeg;base64,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"
          }
        />
        <View style={styles.inputsContainer}>
          <TextInput
            value={tweet}
            onChangeText={setTweet}
            numberOfLines={3}
            multiline={true}
            style={styles.tweetInput}
            placeholder={"What's happening?"}
          />
          <TextInput
            value={imageUrl}
            onChangeText={setImageUrl}
            style={styles.imageInput}
            placeholder={"Image url (optional)?"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
    flex: 1,
    alignItems: "flex-start",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 30,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
  },
  newTweetContainer: {
    flexDirection: "row",
    padding: 15,
  },
  inputsContainer: {
    marginLeft: 10,
  },
  tweetInput: {
    height: 200,
    maxHeight: 300,
    fontSize: 20,
    textAlignVertical: "top",
  },
  imageInput: {},
});
