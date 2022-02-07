import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeOverview from '../screens/RecipeOverview';
import CreateRecipe from '../screens/CreateRecipe';
import { Recipe } from '../database/entities/Recipe';
import { Option } from '../util/Option';
import Header from '../components/Header';

export type RootStackParamList = {
  RecipeOverview: {
    newRecipe: Option<Recipe>;
  };
  CreateRecipe: undefined;
};

const StackNav = createNativeStackNavigator<RootStackParamList>();

const PeepoNavigation = () => {
  return (
    <NavigationContainer>
      <StackNav.Navigator initialRouteName='RecipeOverview'>
        <StackNav.Screen
          name='RecipeOverview'
          component={RecipeOverview}
          initialParams={{ newRecipe: undefined }}
          options={{
            header: () => <Header title={'Recipes'} />,
          }}
        />
        <StackNav.Screen
          name='CreateRecipe'
          component={CreateRecipe}
          options={{
            header: () => <Header title={'New Recipe'} />,
          }}
        />
      </StackNav.Navigator>
    </NavigationContainer>
  );
};

export default PeepoNavigation;
