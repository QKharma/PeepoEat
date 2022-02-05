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
    if (database) return;
    const connection = await DatabaseHandler.getDbConnection();
    if (!isError(connection)) {
      setDatabase(connection);
    } else {
      console.log(`error: ${connection.message}`);
    }
  };

  const dropDb = async () => {
    const tagRepository = getRepository(TagEntity);
    const recipeRepository = getRepository(RecipeEntity);

    tagRepository.clear();
    recipeRepository.clear();
  }

  useEffect( () => {
    setupConnection();
  },[]);

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
