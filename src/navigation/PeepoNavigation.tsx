import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeOverview from '../screens/RecipeOverview';
import CreateRecipe from '../screens/CreateRecipe';
import { Recipe } from '../database/entities/Recipe';

export type RootStackParamList = {
  RecipeOverview: undefined;
  CreateRecipe: undefined;
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
        <StackNav.Screen
          name = 'CreateRecipe'
          component = {CreateRecipe}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

export default PeepoNavigation;