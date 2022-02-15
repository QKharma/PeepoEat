import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
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

const EXAMPLE_TAGS = [
  {
    id: 1,
    name: 'chickn',
  },
  {
    id: 2,
    name: 'other',
  },
];

const CreateRecipe = ({ route, navigation }: CreateRecipeProps) => {
  const database = databaseHandler.connection;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('🍆');

  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const maxDescriptionLen = 90;
  const [descriptionLen, setDescriptionLen] = useState(0);

  const saveRecipe = () => {
    navigation.navigate({
      name: 'RecipeOverview',
      params: { newRecipe: {
        id: 1,
        icon: icon,
        title: title,
        description: description,
        tags: EXAMPLE_TAGS
      } },
      merge: true,
    });
  };

  useEffect(() => {
    setDescriptionLen(description.length);
  }, [description]);

  useEffect(() => {
    if (emojiPickerOpen) setEmojiPickerOpen(false);
  }, [emojiPickerOpen]);

  return (
    <SafeAreaView style={styles.form}>
      <ScrollView>
        {/* recipe title and icon */}
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.inputField, { flex: 1 }]}
            onChangeText={setTitle}
            value={title}
            placeholder='New Recipe Name'
            keyboardAppearance='dark'
          />
          <View>
            <Pressable
              onPressOut={() => setEmojiPickerOpen(!emojiPickerOpen)}
              android_ripple={{ color: '#fff', borderless: true, radius: 19 }}
              style={styles.emojiPickerButton}
            >
              <Text style={styles.emojiPickerIcon}>{icon}</Text>
            </Pressable>
          </View>
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Description</Text>
        <Divider />

        {/* description */}
        <TextInput
          style={[styles.inputField, styles.multiline]}
          multiline
          numberOfLines={5}
          onChangeText={setDescription}
          value={description}
          maxLength={maxDescriptionLen}
          placeholder='Description'
          keyboardAppearance='dark'
        />
        <Text style={styles.multilineInputText}>
          {descriptionLen}/{maxDescriptionLen}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Ingredients</Text>
        <Divider />

        {/* description */}
        <View>
          <View style={{ flexDirection: 'row', elevation: 1, }}>
            <TextInput
              style={{
                backgroundColor: 'rgba(240,240,240,0.9)',
                borderRadius: 10,
                width: '89%',
                marginRight: 2,
                paddingHorizontal: 10,
              }}
              placeholder='Ingredient'
            />
            <Pressable
              style={{
                backgroundColor: 'rgba(240,240,240,0.9)',
                borderRadius: 100,
                width: '10%',
              }}
              android_ripple={{ color: '#fff', borderless: true, radius: 15, }}
            >
              <Text style={{textAlign: 'center', textAlignVertical: 'center', paddingTop: 4, paddingLeft: 1,}}>+</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* create recipe button */}
      <Pressable
        style={styles.createButton}
        android_ripple={{ color: '#fff' }}
        onPressOut={() => saveRecipe()}
      >
        <Text style={styles.buttonText}>Create Recipe</Text>
      </Pressable>
      <EmojiPicker open={emojiPickerOpen} setIcon={setIcon} />
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
  multilineInputText: {
    textAlign: 'right',
    marginRight: 3,
    marginTop: -10,
    fontSize: 12,
  },
  emojiPickerButton: {
    borderWidth: 1,
    height: 40,
    width: 40,
    marginLeft: 5,
    borderRadius: 100,
    justifyContent: 'center',
  },
  emojiPickerIcon: {
    paddingRight: 1,
    paddingBottom: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default CreateRecipe;
