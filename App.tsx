import React, { useState } from 'react';
import 'reflect-metadata';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PeepoNavigation from './src/navigation/PeepoNavigation';
import { Connection } from 'typeorm';

const App = () => {

  const [connection, setConnection] = useState<Connection|undefined>(undefined);
  const value = {connection, setConnection};

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <PeepoNavigation/>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;