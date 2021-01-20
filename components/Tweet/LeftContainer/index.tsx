import React from "react";
import { View } from "react-native";
import { userType } from "../../../types";
import ProfilePicture from "../../ProfilePicture";

export type LeftContainerProps = {
  user: userType;
};

const LeftContainer = ({ user }: LeftContainerProps) => (
  <View>
    <ProfilePicture image={user.image} size={75}/>
  </View>
);

export default LeftContainer;
