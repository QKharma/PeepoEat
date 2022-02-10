import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Divider from '../components/Divider';
import EmojiPicker from '../components/FoodEmojiPicker';
import { databaseHandler } from '../database/databaseHandler';
import { Recipe } from '../database/entities/Recipe';
import { RootStackParamList } from '../navigation/PeepoNavigation';

type CreateRecipeProps = NativeStackScreenProps<
  RootStackParamList,
  'CreateRecipe'
>;

const EXAMPLE: Recipe = {
  id: 1,
  title: 'Example',
  icon: '🌯',
  description: 'blabla',
  tags: [
    {
      id: 1,
      name: 'chickn',
    },
    {
      id: 2,
      name: 'other',
    },
  ],
};

const CreateRecipe = ({ route, navigation }: CreateRecipeProps) => {
  const database = databaseHandler.connection;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🍆')

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const maxDescriptionLen = 100;
  const [descriptionLen, setDescriptionLen] = useState(0);

  const saveRecipe = () => {
    navigation.navigate({
      name: 'RecipeOverview',
      params: { newRecipe: EXAMPLE },
      merge: true,
    });
  };

  useEffect(() => {
    setDescriptionLen(description.length);
  }, [description]);

  useEffect(() => {
    if (emojiPickerOpen)
    setEmojiPickerOpen(false);
  }, [emojiPickerOpen])

  return (
    <SafeAreaView style={styles.form}>
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={[styles.inputField, { flex: 1 }]}
          onChangeText={setName}
          value={name}
          placeholder='New Recipe Name'
          keyboardAppearance='dark'
        />
        <Pressable
          onPressOut={() => setEmojiPickerOpen(!emojiPickerOpen)}
        >
          <Text
            style={{
              paddingRight: 1,
              paddingBottom: 1,
              textAlign: 'center',
              textAlignVertical: 'center',
              borderWidth: 1,
              height: 40,
              width: 40,
              marginLeft: 5,
              borderRadius: 100,
            }}
          >
            {icon}
          </Text>
        </Pressable>
      </View>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Description</Text>
      <Divider />
      <TextInput
        style={[styles.inputField, styles.multiline]}
        multiline
        numberOfLines={2}
        onChangeText={setDescription}
        value={description}
        maxLength={maxDescriptionLen}
        spellCheck={false}
        placeholder='Description'
        keyboardAppearance='dark'
      />
      <Text
        style={{
          textAlign: 'right',
          marginRight: 3,
          marginTop: -10,
          fontSize: 12,
        }}
      >
        {descriptionLen}/{maxDescriptionLen}
      </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Ingredients</Text>
      <Divider />
      <Pressable
        style={styles.createButton}
        android_ripple={{ color: '#fff' }}
        onPressOut={() => saveRecipe()}
      >
        <Text style={styles.buttonText}>Create Recipe</Text>
      </Pressable>
      <EmojiPicker open={emojiPickerOpen} setIcon={(icon) => setIcon(icon)}/>
    </SafeAreaView>
  );
};

const screenPadding = 5;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    padding: screenPadding,
    backgroundColor: '#ccf',
  },
  createButton: {
    marginVertical: 1,
    position: 'absolute',
    marginLeft: screenPadding,
    marginBottom: screenPadding + 10,
    width: '100%',
    bottom: 0,
    backgroundColor: '#eee',
    elevation: 10,
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
  },
  inputField: {
    height: 40,
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  multiline: {
    paddingTop: 10,
    textAlignVertical: 'top',
    height: 80,
  },
});

export default CreateRecipe;
