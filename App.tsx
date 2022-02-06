import React, { useState } from 'react';
import 'reflect-metadata';
import { StyleSheet, View } from 'react-native';
import PeepoNavigation from './src/navigation/PeepoNavigation';
import { Connection } from 'typeorm';

const App = () => {

  const [connection, setConnection] = useState<Connection|undefined>(undefined);
  const value = {connection, setConnection};

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