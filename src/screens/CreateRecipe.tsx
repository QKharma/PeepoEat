import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Connection } from 'typeorm';
import { databaseHandler } from '../database/databaseHandler';
import { Recipe } from '../database/entities/Recipe';
import { RootStackParamList } from '../navigation/PeepoNavigation';

type CreateRecipeProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateRecipe'
>;

const CreateRecipe = ({route, navigation}: CreateRecipeProps) => {

  const [database, setDatabase] = useState<Connection | undefined>();

  const setupConnection = async () => {
    if (database) return;
    setDatabase(await databaseHandler.connection);
  };

  const saveRecipe = () => {
    const recipe: Recipe = {
      id: 1,
      title: 'Example',
      icon: '1',
      description: 'blabla',
      tags: []
    }

    navigation.navigate({
      name: 'RecipeOverview',
      params: {newRecipe: recipe},
      merge: true
    });
  }

  useEffect(() => {
    setupConnection();
  }, [])
  
  return(
    <View>
      <Text>Placeholder recipe creation</Text>
      <Button title='save recipe' onPress={() => saveRecipe()}></Button>
      <Button title='go back' onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

export default CreateRecipe;