import React, { useState } from 'react';
import 'reflect-metadata';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PeepoNavigation from './src/navigation/PeepoNavigation';
import { Connection } from 'typeorm';

const App = () => {

  const [connection, setConnection] = useState<Connection|undefined>(undefined);
  const value = {connection, setConnection};

  return (
    <Pressable 
      onPress={() => Keyboard.dismiss()}
      android_disableSound={true}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <PeepoNavigation/>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;