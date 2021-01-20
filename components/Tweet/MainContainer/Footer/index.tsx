import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { Entypo, Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import tweets from "../../../../data/tweets";
import { TweetType } from "../../../../types";

export type FooterProps = {
  tweet: TweetType;
};

const Footer = ({ tweet }: FooterProps) => (
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
      <AntDesign name={"hearto"} size={22} color={"grey"} />
      <Text style={styles.number}>{tweet.numberOfLikes}</Text>
    </View>
    <View style={styles.iconContainer}>
      <EvilIcons name={"share-google"} size={30} color={"grey"}/>
    </View>
  </View>
);

export default Footer;
