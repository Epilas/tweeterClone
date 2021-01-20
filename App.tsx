import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import config from "./aws-exports";
import { useEffect } from "react";
import { getUser } from "./graphql/queries";
import { createUser } from "./graphql/mutations";

Amplify.configure(config);

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return "aKvqFF5oDDNjCDEMUBIkSAEkOsIKAAAc0JRABYNg2HIAbujlEKQbCAWAETGZoEFiAiA2JjWAIAmC4wcJDbiuAOuIaK4Bzht4aNt3wEIehD2wBEQaSKHiEMDYduiEIFYNhCAEFBEBCAQgMhrEIAVgWEIATGsQhkYwMQgMBCEMA2BsQgJ";
  };
  const saveUserToDB = async (user) => {
    console.log(user)
      await API.graphql(graphqlOperation(createUser, {input: user}))
  };

  useEffect(() => {
    const updateUser = async () => {
      //Get current autheticeted user
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      if (userInfo) {
        //Check if user already exist in database
        const userData = await API.graphql(
          graphqlOperation(getUser, { id: userInfo.attributes.sub })
        );
        if (!userData.data.getUser) {
          const user = {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage(),
          };
          await saveUserToDB(user);
        } else {
          console.log("User alredy exist");
        }
      }
      //If it doesynt. create the user in the database
    };
    updateUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
