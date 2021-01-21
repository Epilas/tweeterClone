import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import { TweetType } from "../../../../types";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createLike, deleteLike } from "../../../../graphql/mutations";
import { useState, useEffect } from "react";

export type FooterProps = {
  tweet: TweetType;
};

const Footer = ({ tweet }: FooterProps) => {
  const [user, setUser] = useState(null);
  const [myLike, setMylike] = useState(null);
  const [likesCount, setLikesCount] = useState(tweet.likes.items.length);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);

      const serachedLike = tweet.likes.items.find(
        (like) => like.userID === currentUser.attributes.sub
      );
      setMylike(serachedLike);
    };
    fetchUser();
  }, []);

  const submitLike = async () => {
    const like = {
      userID: user.attributes.sub,
      tweetID: tweet.id,
    };
    console.log(like);
    try {
      const res = await API.graphql(
        graphqlOperation(createLike, { input: like })
      );
      setMylike(res.data.createLike);
      setLikesCount(likesCount + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const removeLike = async () => {
    try {
      await API.graphql(graphqlOperation(deleteLike, { input: {id: myLike.id} }));
      setLikesCount(likesCount - 1);
      setMylike(null);
    } catch (e) {
      console.log(e);
    }
  };

  async function onLike() {
    if (!user) {
      return;
    }
    if (!myLike) {
      await submitLike();
    } else {
      await removeLike();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name={"message-circle"} size={25} color={"grey"} />
        <Text style={styles.number}>{tweet.numberOfComments}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name={"retweet"} size={38} color={"grey"} />
        <Text style={styles.number}>{tweet.numberOfRetweets}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onLike}>
          <AntDesign
            name={!myLike ? "hearto" : "heart"}
            size={22}
            color={!myLike ? "grey" : "red"}
          />
        </TouchableOpacity>
        <Text style={styles.number}>{likesCount}</Text>
      </View>
      <View style={styles.iconContainer}>
        <EvilIcons name={"share-google"} size={30} color={"grey"} />
      </View>
    </View>
  );
};

export default Footer;
