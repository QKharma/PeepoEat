import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Recipe } from '../database/entities/Recipe';
import { RootStackParamList } from '../navigation/PeepoNavigation';

type CreateRecipeProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateRecipe'
>;

const CreateRecipe = ({navigation}: CreateRecipeProps) => {

  const saveRecipe = () => {
    const recipe: Recipe = {
      id: 1,
      title: 'Example',
      icon: '1',
      description: 'blabla',
      tags: []
    }
    
    navigation.goBack();
  }
  
  return(
    <View>
      <Text>Placeholder recipe creation</Text>
      <Button title='save recipe' onPress={() => saveRecipe()}></Button>
      <Button title='go back' onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

export default CreateRecipe;