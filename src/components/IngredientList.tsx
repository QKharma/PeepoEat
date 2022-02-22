import React, { useEffect, useState } from 'react';
import {
  Pressable,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import IngredientCard, { unit } from './IngredientCard';
import UnitPicker from './UnitPicker';

interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: unit;
}

const IngredientList = () => {
  const [pickerUnit, setPickerUnit] = useState(unit.stk)
  const [unitPickerOpen, setUnitPickerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {
      id: 1,
      name: 'zwibla',
      amount: 1,
      unit: unit.stk,
    },
    {
      id: 2,
      name: 'burger bons',
      amount: 2,
      unit: unit.stk,
    },
    {
      id: 3,
      name: 'soos',
      amount: 500,
      unit: unit.ml,
    },
    {
      id: 4,
      name: 'zwibla',
      amount: 1,
      unit: unit.stk,
    },
    {
      id: 5,
      name: 'burger bons',
      amount: 2,
      unit: unit.stk,
    },
    {
      id: 6,
      name: 'soos',
      amount: 500,
      unit: unit.ml,
    },
  ]);

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients(ingredients.concat(ingredient));
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  };

  const renderIngredient = (item: Ingredient) => {
    return (
      <IngredientCard
        key={item.id}
        name={item.name}
        amount={item.amount}
        unit={item.unit}
        removeCard={() => removeIngredient(item.id)}
      />
    );
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', elevation: 1 }}>
        <TextInput
          style={{
            backgroundColor: 'rgba(240,240,240,0.9)',
            borderRadius: 10,
            width: '56%',
            marginRight: 2,
            paddingHorizontal: 10,
          }}
          placeholder='Ingredient'
          value={search}
          onChangeText={setSearch}
        />
        <TextInput
          style={{
            backgroundColor: 'rgba(240,240,240,0.9)',
            borderRadius: 10,
            width: '16%',
            marginRight: 2,
            paddingHorizontal: 10,
          }}
          placeholder='0'
        />
        <View style={{ width: '16%',flexDirection: 'column' }}>
          <Pressable
            style={{
              backgroundColor: 'rgba(240,240,240,0.9)',
              borderRadius: 10,
              marginRight: 2,
              paddingHorizontal: 10,
              flex: 1,
              paddingTop: 3,
            }}
            onPress={() => setUnitPickerOpen(!unitPickerOpen)}
          ><Text style={{textAlignVertical: 'center', textAlign: 'center'}}>{pickerUnit}</Text></Pressable>
        </View>
        <Pressable
          style={{
            backgroundColor: 'rgba(240,240,240,0.9)',
            borderRadius: 100,
            width: '10%',
          }}
          android_ripple={{ color: '#fff', borderless: true, radius: 15 }}
          onPress={() => {
            addIngredient({ id: 5, name: search, amount: 0, unit: unit.stk})
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              paddingTop: 4,
              paddingLeft: 1,
            }}
          >
            +
          </Text>
        </Pressable>
      </View>
      <UnitPicker open={unitPickerOpen} close={setUnitPickerOpen} set={setPickerUnit}/>
      <ScrollView
        style={{
          height: 200,
          marginTop: 10,
          backgroundColor: 'rgba(0,0,0,0.1)',
          padding: 2,
          paddingHorizontal: 4,
          borderRadius: 5,
        }}
      >
        {ingredients.map((item) => renderIngredient(item))}
      </ScrollView> 
    </View>
  );
};

export default IngredientList;
