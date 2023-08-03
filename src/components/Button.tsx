import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors} from '../utils/theme/color';

interface InputProps {
  palceholder?: string;
  title: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
}

const Button = ({
  title = 'Login',
  buttonStyle,
  textStyle,
  onPress,
  ...rest
}: InputProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
      {...rest}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.Blue,
    height: 50,
    width: '60%',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: Colors.White,
    fontSize: 16,
  },
});

export default Button;
