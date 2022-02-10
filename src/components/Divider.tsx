import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DividerProps {
  margins?: number;
}

const Divider = (props: DividerProps) => {
  const margins = (props.margins) ? props.margins : 5;
  return (
    <View
      style={[styles.divider, {marginVertical: margins}]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: '#000',
    elevation: 1,
    opacity: 0.4,
  }
})

export default Divider;
