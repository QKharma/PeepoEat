import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Tag from './Tag';

interface TagListProps {
  data: Tag[];
}

const TagList = (props: TagListProps) => {

  const renderItem = ({item}: {item: Tag}) => (
    <View style={styles.tag}>
      <Tag name={item.name}/>
    </View>
  );

  return (
    <View>
      <FlatList
        horizontal={true}
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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