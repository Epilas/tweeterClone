import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { View, FlatList } from "react-native";
import tweets from "../../data/tweets";
import Tweet, { TweetProps } from "../Tweet";
import styles from "./styles";
import { API, graphqlOperation } from "aws-amplify";
import { listTweets } from "../../graphql/queries";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const tweetsData = await API.graphql(graphqlOperation(listTweets));
      setTweets(tweetsData.data.listTweets.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={tweets}
        renderItem={({ item }) => <Tweet tweet={item} />}
        keyExtractor={(item) => item}
        refreshing={loading}
        onRefresh={fetchTweets}
      />
    </View>
  );
};
export default Feed;
