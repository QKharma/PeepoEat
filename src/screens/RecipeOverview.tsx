import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { RootStackParamList } from '../navigation/PeepoNavigation';
import { ITag } from '../components/Tag';
import RecipeCard from '../components/RecipeCard';

type RecipeOverviewProps = NativeStackScreenProps<
  RootStackParamList,
  'RecipeOverview'
>;

interface IRecipe {
  id: number;
  icon: string;
  title: string;
  description: string;
  tags: ITag[];
}

const TEST_RECIPE_DATA: IRecipe[] = [
  {
    id: 1,
    icon: '🍔',
    title: 'Example 1',
    description: 'lorem ipsum',
    tags: [
      {
        id: 1,
        name: 'aaaaaa'
      },
      {
        id: 2,
        name: 'other'
      }
    ]
  },
  {
    id: 2,
    icon: '🥗',
    title: 'Example 2',
    description: 'lorem ipsum',
    tags: [
      {
        id: 1,
        name: 'food'
      },
      {
        id: 2,
        name: 'other'
      }
    ]
  }
];

const RecipeOverview = ({ navigation }: RecipeOverviewProps) => {

  const renderItem = ({item}: {item: IRecipe}) => (
    <RecipeCard icon={item.icon} title={item.title} tags={item.tags}/>
  );

  return (
    <FlatList
      style={styles.overview}
      data={TEST_RECIPE_DATA}
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
