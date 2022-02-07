import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface Tag {
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
    backgroundColor: 'rgb(220,220,220)',
    borderRadius: 10,
  },
  content: {
    fontSize: 12,
    padding: 1,
  }
})

export default Tag;