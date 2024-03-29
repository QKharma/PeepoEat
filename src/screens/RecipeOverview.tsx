import React, { useEffect, useState } from 'react';
import { Connection, getRepository } from 'typeorm';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/PeepoNavigation';
import RecipeCard from '../components/RecipeCard';
import { databaseHandler } from '../database/databaseHandler';
import { Recipe as RecipeEntity } from '../database/entities/Recipe';
import { isSome } from '../util/Option';

type RecipeOverviewProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeOverview'
>;

const RecipeOverview = ({ route, navigation }: RecipeOverviewProps) => {
  
  const { newRecipe } = route.params;

  const database = databaseHandler.connection;

  const [recipeCards, setRecipeCards] = useState<RecipeEntity[]>([]);

  const getRecipes = async () => {
    if (!database) return;
    const recipes = await database
      .getRepository(RecipeEntity)
      .createQueryBuilder('recipe')
      .select(['recipe.id', 'recipe.icon', 'recipe.title'])
      .leftJoinAndSelect('recipe.tags', 'tag')
      .getMany();

    setRecipeCards(recipes);
  }

  const addRecipe = (recipe: RecipeEntity) => {
    setRecipeCards(recipeCards.concat([recipe]))
  }
  
  const updateRecipeList = async () => {
    await getRecipes();
  }

  useEffect( () => {
    updateRecipeList();
  }, []);

  useEffect(() => {
    if (!isSome(newRecipe)) return;
    if (recipeCards.filter((c) => c.id == newRecipe.id).length > 0) return;
    addRecipe(newRecipe)
  }, [route.params?.newRecipe])

  const renderItem = ({ item }: { item: RecipeEntity }) => (
    <RecipeCard 
      style={styles.recipeCard}
      id={item.id}
      icon={item.icon} 
      title={item.title} 
      tags={item.tags} 
    />
  ); 

  return (
    <View style={styles.overview}>
      <FlatList
        data={recipeCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        overScrollMode='always'
      />
      <Pressable style={styles.createRecipeButton} android_ripple={{color: '#fff'}} onPressOut={() => navigation.push('CreateRecipe')}>
        <Text style={styles.buttonText}>Create Recipe</Text>
      </Pressable>
    </View>
  );
};

const screenPadding = 5;

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'column',
    padding: screenPadding,
    backgroundColor: '#ccc'
  },
  createRecipeButton: {
    marginVertical: 1,
    position: 'absolute',
    marginLeft: screenPadding,
    marginBottom: screenPadding + 10,
    width: '100%',
    bottom: 0,
    backgroundColor: '#eee',
    elevation: 10,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
  recipeCard: {
    marginTop: 1,
  }
});

export default RecipeOverview;
