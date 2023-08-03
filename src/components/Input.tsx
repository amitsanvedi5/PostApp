import React from 'react';
import {KeyboardType, StyleSheet, TextInput} from 'react-native';
import {Colors} from '../utils/theme/color';

interface InputProps {
  palceholder?: string;
  value: string;
  onChange: (val: string) => void;
  keyboardType?: KeyboardType;
}

const Input = ({
  palceholder,
  onChange,
  keyboardType = 'default',
  ...rest
}: InputProps) => {
  return (
    <TextInput
      placeholder={palceholder}
      style={[styles.inputStyle]}
      onChangeText={val => onChange(val)}
      keyboardType={keyboardType}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.Grey,
    width: '100%',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default Input;
