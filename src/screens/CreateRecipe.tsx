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
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Divider from '../components/Divider';
import EmojiPicker from '../components/FoodEmojiPicker';
import IngredientList from '../components/IngredientList';
import { databaseHandler } from '../database/databaseHandler';
import { Recipe } from '../database/entities/Recipe';
import { RootStackParamList } from '../navigation/PeepoNavigation';
import { styles } from '../styles/CreateRecipeStyles';

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
      params: {
        newRecipe: {
          id: 1,
          icon: icon,
          title: title,
          description: description,
          tags: EXAMPLE_TAGS,
        },
      },
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

        {/* ingredients */}
      </ScrollView>
      <View style={{flexGrow: 100}}>
        <IngredientList/>
      </View>
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

export default CreateRecipe;
