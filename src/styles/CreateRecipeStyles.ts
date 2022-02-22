import { StyleSheet } from 'react-native';

const screenPadding = 5;

export const styles = StyleSheet.create({
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