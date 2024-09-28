import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CustomerNavigation from "./CustomerNavigation";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Homes" component={HomeScreen} />
      <Stack.Screen name="Customers" component={CustomerNavigation} />
    </Stack.Navigator>
  );
}
