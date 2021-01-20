export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  NewTweet: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Messages: undefined;
};

export type HomeNavigatorParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type userType = {
  id: string;
  username: string;
  name: string;
  image?: string;
};

export type TweetType = {
  id: string;
  createdAt: string;
  user: userType;
  content: string;
  image?: string;
  numberOfComments?: number;
  numberOfRetweets?: number;
  numberOfLikes?: number;
};
