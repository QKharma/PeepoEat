import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeOverview from '../screens/RecipeOverview';

type RootStackParamList = {
  Home: undefined;
}

const StackNav = createNativeStackNavigator<RootStackParamList>();

const PeepoNavigation = () => {

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='Home'>
        <StackNav.Screen
          name = 'Home'
          component = {RecipeOverview}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default PeepoNavigation;