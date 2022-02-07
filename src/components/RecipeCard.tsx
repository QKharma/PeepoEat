import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Tag from './Tag';
import TagList from './TagList';

interface CardProps {
  style: {};
  id:number;
  title: string;
  icon: string;
  tags: Tag[];
}

const RecipeCard = (props: CardProps) => {
  return (
    <View style={props.style}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.icon}>{props.icon}</Text>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <TagList data={props.tags}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    padding: 10,
    elevation: 10,
    backgroundColor: '#fff',
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
