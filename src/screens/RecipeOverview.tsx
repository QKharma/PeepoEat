import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, FlatList, TouchableNativeFeedback, Pressable } from 'react-native';
import { RootStackParamList } from '../navigation/PeepoNavigation';
import RecipeCard from '../components/RecipeCard';
import { Connection, getRepository } from 'typeorm';
import { databaseHandler, DatabaseHandler } from '../database/databaseHandler';
import { Recipe as RecipeEntity } from '../database/entities/Recipe';
import { Tag as TagEntity } from '../database/entities/Tag';
import { isSome } from '../util/Option';

type RecipeOverviewProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeOverview'
>;

const RecipeOverview = ({ route, navigation }: RecipeOverviewProps) => {

  const { newRecipe } = route.params;

  const [database, setDatabase] = useState<Connection | undefined>();
  const [recipeCards, setRecipeCards] = useState<RecipeEntity[]>([]);

  const setupConnection = async () => {
    if (database) return;
    setDatabase(await databaseHandler.connection);
  };

  const dropDb = async () => {
    const tagRepository = getRepository(TagEntity);
    const recipeRepository = getRepository(RecipeEntity);

    await tagRepository.clear();
    await recipeRepository.clear();
  }

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
    await setupConnection();
    await getRecipes();
  }

  useEffect( () => {
    updateRecipeList();
  },[]);

  useEffect(() => {
    if (!isSome(newRecipe)) return;
    if (recipeCards.filter((c) => c.id == newRecipe.id).length > 0) return;
    addRecipe(newRecipe)
  }, [route.params?.newRecipe])

  const renderItem = ({ item }: { item: RecipeEntity }) => (
    <RecipeCard id={item.id} icon={item.icon} title={item.title} tags={item.tags} />
  ); 

  return (
    <View style={styles.overview}>
      <FlatList
        data={recipeCards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        overScrollMode='always'
      />
      <View>
        <Pressable style={styles.createRecipeButton} android_ripple={{color: '#fff'}} onPressOut={() => navigation.push('CreateRecipe')}>
          <Text style={styles.buttonText}>Create Recipe</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#ccc'
  },
  createRecipeButton: {
    marginVertical: 10,
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
    elevation: 10,
    borderRadius: 5,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
  }
});

export default RecipeOverview;
