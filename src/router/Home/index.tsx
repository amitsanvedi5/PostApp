import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screens/Login';
import Posts from '../../screens/Posts';
import PostDetail from '../../screens/PostsDetail';
import {text} from '../../utils/commonText';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const {loginScreen, login, posts, postDetail} = text;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={loginScreen}
        component={Login}
        options={{
          headerTitle: login,
        }}
      />
      <Stack.Screen
        name={text.postsScreen}
        component={Posts}
        options={{
          headerTitle: posts,
        }}
      />
      <Stack.Screen
        name={text.postDetailScreen}
        component={PostDetail}
        options={{
          headerTitle: postDetail,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
