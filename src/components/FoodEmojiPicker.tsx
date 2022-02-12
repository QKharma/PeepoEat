import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Keyboard,
  FlatList,
} from 'react-native';

interface EmojiProps {
  open: boolean;
  setIcon: (icon: string) => void;
}

const EmojiPicker = (props: EmojiProps) => {

  const [open, setOpen] = useState(false);

  const animWidth = new Animated.Value(30);
  const animHeight = new Animated.Value(30);

  const openPicker = async () => {
    const animVert = Animated.timing(animWidth, {
      toValue: 220,
      duration: 200,
      useNativeDriver: false,
    });
    const animHoriz = Animated.timing(animHeight, {
      toValue: 400,
      duration: 200,
      useNativeDriver: false,
    });

    animVert.start(() => animHoriz.start());
  };

  const closePicker = () => {
    setOpen(false);
  };

  const chooseEmoji = useCallback(async (icon: string) => {
    props.setIcon(icon);
    closePicker();
  }, []);

  useEffect(() => {
    if (props.open) {
      Keyboard.dismiss();
      setOpen(true);
    }
    if (open) openPicker();
  }, [open, props.open]);

  const PickerContent = () => {
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

    const emojiGrid: String[][] = [];

    while (foodEmojis.length) {
      if (foodEmojis.length < 5) {
        emojiGrid.push(foodEmojis.splice(0, foodEmojis.length));
        continue;
      }
      emojiGrid.push(foodEmojis.splice(0, 5));
    }

    const renderRow = ({ item }: { item: String[] }) => {
      const buttons = item.map((e) => {
        return (
          <Pressable
            key={e.toString()}
            style={{ width: 40, height: 40, elevation: 5 }}
            onPress={() => chooseEmoji(e.toString())}
          >
            <Text style={{ textAlign: 'center', fontSize: 20 }}>{e}</Text>
          </Pressable>
        );
      });

      return (
        <View
          key={item.toString()}
          style={{ justifyContent: 'flex-start', flexDirection: 'row' }}
        >
          {buttons}
        </View>
      );
    };

    return (
      <FlatList
        data={emojiGrid}
        renderItem={renderRow}
        keyExtractor={(item) => item.toString()}
      />
    );
  };

  if (open) {
    return (
      <>
        <Pressable style={styles.container} onPress={() => closePicker()} />
        <Animated.View
          style={[
            styles.picker,
            {
              width: animWidth,
              height: animHeight,
            },
          ]}
        >
          <View>{open && <PickerContent />}</View>
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
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgb(0,0,0)',
    opacity: 0.5,
    elevation: 11,
  },
  picker: {
    top: 10,
    right: '15%',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 11,
    padding: 10,
  },
});

export default EmojiPicker;
