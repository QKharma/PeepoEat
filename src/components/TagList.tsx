import React from 'react';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import Tag, { ITag } from './Tag';

interface TagListProps {
  data: ITag[];
}

const TagList = (props: TagListProps) => {

  const renderItem = ({item}: {item: ITag}) => (
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