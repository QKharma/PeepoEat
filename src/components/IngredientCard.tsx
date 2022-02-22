import React from 'react';
import { TouchableWithoutFeedback, View, Text, Pressable } from 'react-native';

export enum unit {
  stk = 'stk.',
  l = 'L',
  ml = 'ml',
  kg = 'kg',
  g = 'g',
}

interface IngredientCardProps {
  name: string;
  amount: number;
  unit: unit;
  removeCard: () => void;
}

const IngredientCard = (props: IngredientCardProps) => {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          flexDirection: 'row',
          borderRadius: 5,
          backgroundColor: '#eee',
          elevation: 10,
          marginVertical: 1,
          padding: 5,
          paddingVertical: 10,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>{props.name}</Text>
        </View>
        <View>
          <Text>{`${props.amount} ${props.unit}`}</Text>
        </View>
        <View>
          <Pressable
            style={{
              marginLeft: 10,
              borderRadius: 50,
              backgroundColor: '#f88',
              aspectRatio: 1,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            onPress={props.removeCard}
          >
            <Text style={{ textAlign: 'center' }}>X</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default IngredientCard;
