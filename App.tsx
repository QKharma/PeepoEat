import React from 'react';
import 'reflect-metadata';
import { StyleSheet, View } from 'react-native';
import PeepoNavigation from './src/navigation/PeepoNavigation';

const App = () => {
  return (
    <View style={styles.container}>
      <PeepoNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;