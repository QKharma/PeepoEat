import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';

interface EmojiProps {
  open: boolean;
  setIcon: (icon: string) => void;
}

const EmojiPicker = (props: EmojiProps) => {

  const [open, setOpen] = useState(false);

  const animWidth = useRef(new Animated.Value(30)).current;
  const animHeight = useRef(new Animated.Value(30)).current;

  const openPicker = async () => {
    Animated.timing(animWidth, {
      toValue: 220,
      duration: 200,
      useNativeDriver: false,
    }).start(() =>
      Animated.timing(animHeight, {
        toValue: 400,
        duration: 200,
        useNativeDriver: false,
      }).start()
    );
  };

  const closePicker = async () => {
    Animated.timing(animHeight, {
      toValue: 30,
      duration: 200,
      useNativeDriver: false,
    }).start(() =>
      Animated.timing(animWidth, {
        toValue: 30,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      })
    );
  };

  const chooseEmoji = useCallback( (icon: string) => {
    props.setIcon(icon);
    closePicker();
  }, [props.setIcon]);

  useEffect(() => {
    if (props.open) setOpen(true);
    if (open) openPicker();
  }, [open, props.open]);

  const foodEmojis: String[] = [
    '🍏',
    '🍎',
    '🍐',
    '🍊',
    '🍋',
    '🍌',
    '🍉',
    '🍇',
    '🍓',
    '🍈',
    '🍒',
    '🍑',
    '🥭',
    '🍍',
    '🥥',
    '🥝',
    '🍅',
    '🍆',
    '🥑',
    '🥦',
    '🥬',
    '🥒',
    '🌶',
    '🌽',
    '🥕',
    '🧄',
    '🧅',
    '🥔',
    '🍠',
    '🥐',
    '🥯',
    '🍞',
    '🥖',
    '🥨',
    '🧀',
    '🥚',
    '🍳',
    '🧈',
    '🥞',
    '🧇',
    '🥓',
    '🥩',
    '🍗',
    '🍖',
    '🦴',
    '🌭',
    '🍔',
    '🍟',
    '🍕',
    '🥪',
    '🥙',
    '🧆',
    '🌮',
    '🌯',
    '🥗',
    '🥘',
    '🥫',
    '🍝',
    '🍜',
    '🍲',
    '🍛',
    '🍣',
    '🍱',
    '🥟',
    '🦪',
    '🍤',
    '🍙',
    '🍚',
    '🍘',
    '🍥',
    '🥠',
    '🥮',
    '🍢',
    '🍡',
    '🍧',
    '🍨',
    '🍦',
    '🥧',
    '🧁',
    '🍰',
    '🎂',
    '🍮',
    '🍭',
    '🍬',
    '🍫',
    '🍿',
    '🍩',
    '🍪',
    '🌰',
    '🥜',
    '🍯',
    '🥛',
    '🍼',
    '🫖',
    '☕️',
    '🍵',
    '🧃',
    '🥤',
    '🍶',
    '🍺',
    '🍻',
    '🥂',
    '🍷',
    '🥃',
    '🍸',
    '🍹',
    '🧉',
    '🍾',
    '🧊',
    '🥄',
    '🍴',
    '🍽',
    '🥣',
    '🥡',
    '🥢',
    '🧂',
  ];

  const PickerContent = () => {
    const emojiGrid: String[][] = [];

    while (foodEmojis.length) {
      if (foodEmojis.length < 5) {
        emojiGrid.push(foodEmojis.splice(0, foodEmojis.length));
        continue;
      }
      emojiGrid.push(foodEmojis.splice(0, 5));
    }

    const emojiButtons = emojiGrid.map((e) => {
      const row = e.map((e) => (
        <Pressable
          key={e.toString()}
          style={{ width: 40, height: 40, elevation: 5 }}
          onPress={() => chooseEmoji(e.toString())}
        >
          <Text style={{ textAlign: 'center', fontSize: 20 }}>{e}</Text>
        </Pressable>
      ));

      return (
        <View
          key={e.toString()}
          style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
        >
          {row}
        </View>
      );
    });

    return <View>{emojiButtons}</View>;
  };

  if (open) {
  return (
    <>
      <Pressable style={styles.container} onPress={() => setOpen(!open)}/>
      <Animated.View
        style={[
          styles.picker,
          {
            width: animWidth,
            height: animHeight,
          },
        ]}
      >
        <ScrollView>
          <PickerContent />
        </ScrollView>
      </Animated.View>
    </>
  );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '105%',
    height: '102%',
    position: 'absolute',
    backgroundColor: 'rgb(0,0,0)',
    opacity: 0.5,
    elevation: 11,
  },
  picker: {
    top: 10,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 11,
    padding: 10,
  },
});

export default EmojiPicker;
