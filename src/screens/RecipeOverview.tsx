import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RecipeCard from '../components/RecipeCard';

const RecipeOverview = () => {
  return (
    <View style={styles.overview}>
      <RecipeCard title={'Example Recipe 1'}/>
      <RecipeCard title={'Example Recipe 2'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  overview: {
    padding: 5,
  },
});

export default RecipeOverview;