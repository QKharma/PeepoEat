import React, { useCallback, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { RootStackParamList } from '../navigation/PeepoNavigation';
import Tag from '../components/Tag';
import RecipeCard from '../components/RecipeCard';
import { Connection, getRepository } from 'typeorm';
import { DatabaseHandler } from '../database/database';
import { isError } from '../util/Result';
import { Recipe as RecipeEntity } from '../database/entities/Recipe';
import { Tag as TagEntity } from '../database/entities/Tag';

type RecipeOverviewProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeOverview'
>;

interface RecipeCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  tags: Tag[];
}

const TEST_RECIPE_DATA: RecipeCard[] = [
  {
    id: 1,
    icon: '🍔',
    title: 'Example 1',
    description: 'lorem ipsum',
    tags: [
      {
        id: 1,
        name: 'aaaaaa',
      },
      {
        id: 2,
        name: 'other',
      },
    ],
  },
  {
    id: 2,
    icon: '🥗',
    title: 'Example 2',
    description: 'lorem ipsum',
    tags: [
      {
        id: 1,
        name: 'food',
      },
      {
        id: 2,
        name: 'other',
      },
    ],
  },
];

const RecipeOverview = ({ navigation }: RecipeOverviewProps) => {
  const [database, setDatabase] = useState<Connection | undefined>();
  const [recipeCards, setRecipeCards] = useState<RecipeCard[]>([]);

  const setupConnection = async () => {
    const connection = await DatabaseHandler.getDbConnection();
    if (!isError(connection)) {
      setDatabase(connection);
    } else {
      console.log(`error: ${connection.message}`);
    }
  };

  const getTags = async () => {
    const tagRepository = getRepository(TagEntity);
    let result = await tagRepository.find();
    if (result.length === 0) {
      const tag1 = new TagEntity();
      tag1.name = 'food';
      const tag2 = new TagEntity();
      tag2.name = 'other';
      await tagRepository.save(tag1);
      await tagRepository.save(tag2);
    }
  };

  const getRecipes = async () => {
    const tagRepository = getRepository(TagEntity);
    let tagResult = await tagRepository.find();

    const recipeRepository = getRepository(RecipeEntity);
    let recipeResult = await recipeRepository.find();
    if (recipeResult.length === 0) {
      const newRecipe = new RecipeEntity();
      newRecipe.title = 'Example 1';
      newRecipe.icon = '😀';
      newRecipe.description = '';
      newRecipe.tags = tagResult;
      recipeResult = await recipeRepository.find();
    }
    setRecipeCards(recipeResult);
  };

  useEffect(() => {
    if (!database) {
      setupConnection();
    } else {
      getTags();
      getRecipes();
    }
  }, []);

  const renderItem = ({ item }: { item: RecipeCard }) => (
    <RecipeCard icon={item.icon} title={item.title} tags={item.tags} />
  );

  return (
    <FlatList
      style={styles.overview}
      data={recipeCards}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      overScrollMode='always'
    />
  );
};

const styles = StyleSheet.create({
  overview: {
    padding: 5,
  },
});

export default RecipeOverview;
