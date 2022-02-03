import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Tag from './Tag';
import TagList from './TagList';

interface CardProps {
  title: string;
}

const RecipeCard = (props: CardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.icon}>🍗</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <TagList data={['food', 'other']}/>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgb(0,0,0)'
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  }
})

export default RecipeCard;
