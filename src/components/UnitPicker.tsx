import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  Pressable,
  TouchableWithoutFeedbackBase,
  TouchableWithoutFeedback,
} from 'react-native';
import { unit } from './IngredientCard';

interface UnitPickerProps {
  open: boolean;
  close: (close: boolean) => void;
  set: (unit: unit) => void;
}

const UnitPicker = (props: UnitPickerProps) => {
  const [open, setOpen] = useState(false);

  const units = Object.values(unit);

  useEffect(() => {
    if (props.open) {
      Keyboard.dismiss();
      setOpen(true);
    }
    if (!props.open) {
      setOpen(false);
    }
  }, [props.open]);

  if (open) {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 3,
          borderRadius: 5,
          width: '100%',
          marginTop: 2,
          justifyContent: 'space-evenly',
        }}
      >
        <>
          {units.map((unit) => (
            <Pressable
              key={unit.toString()}
              style={{
                flex: 1,
                marginHorizontal: 1,
                backgroundColor: '#eee',
                borderRadius: 5,
                padding: 2,
                paddingVertical: 5,
              }}
              onPress={() => {
                props.set(unit);
                props.close(false);
                setOpen(!open);
              }}
            >
              <Text style={{ textAlign: 'center' }}>{unit}</Text>
            </Pressable>
          ))}
        </>
      </View>
    );
  } else {
    return null;
  }
};

export default UnitPicker;
