import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeOverview from '../screens/RecipeOverview';

export type RootStackParamList = {
  RecipeOverview: undefined;
}

const StackNav = createNativeStackNavigator<RootStackParamList>();

const PeepoNavigation = () => {

  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='RecipeOverview'>
        <StackNav.Screen
          name = 'RecipeOverview'
          component = {RecipeOverview}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default PeepoNavigation;