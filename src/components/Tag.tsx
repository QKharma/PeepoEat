import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface TagProps {
  content: string;
}

const Tag = (props: TagProps) => {
  return (
    <View style={styles.tag}>
      <Text style={styles.content}>{props.content}</Text>
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