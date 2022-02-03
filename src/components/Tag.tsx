import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface ITag {
  id: number;
  name: string;
}

interface TagProps {
  name: string;
}

const Tag = (props: TagProps) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.content}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 5,
    backgroundColor: 'rgb(200,200,200)',
    borderRadius: 10,
  },
  content: {
    fontSize: 12,
    padding: 1,
  }
})

export default Tag;