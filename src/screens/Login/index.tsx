import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';

import Input from '../../components/Input';
import {globalStyles} from '../../utils/globalStyles';
import Button from '../../components/Button';
import {text} from '../../utils/commonText';
import {Constants, HEIGHT} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const {postsScreen, username, login} = text;
  const {UserName, Password} = Constants;

  const checkLogin = () => {
    if (userName === UserName && password === Password) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        visibilityTime: 1000,
      });
      navigation.navigate(postsScreen);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Login Failed!',
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[globalStyles.container, styles.container]}>
        <Input
          palceholder={username}
          value={userName}
          onChange={val => setUserName(val)}
        />
        <Input
          palceholder={text.password}
          value={password}
          onChange={val => setPassword(val)}
          secureTextEntry={true}
        />
        <Button title={login} onPress={() => checkLogin()} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: HEIGHT / 15,
  },
});

export default Login;
