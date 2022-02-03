import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import Tag from './Tag';

interface TagListProps {
  data: string[];
}

const TagList = (props: TagListProps) => {

  const renderItem = ({item}: {item: string}) => (
    <View style={styles.tag}>
      <Tag content={item}/>
    </View>
  );

  return (
    <View>
      <FlatList
        horizontal={true}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    marginRight: 6,
  }
})

export default TagList;