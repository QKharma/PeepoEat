import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';

const Header = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const notchHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  header: {
    paddingTop: notchHeight,
    height: (notchHeight ? notchHeight : 0) + 30,
    backgroundColor: '#fff',
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Header;
