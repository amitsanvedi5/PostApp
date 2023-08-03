/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {globalStyles} from '../../utils/globalStyles';
import {Constants, HEIGHT} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Colors} from '../../utils/theme/color';
import {text} from '../../utils/commonText';
import {PostItemInterface} from '../../utils/interface';

const Posts = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState<object[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const {baseURL} = Constants;
  const {postDetailScreen} = text;

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    try {
      await axios.get(`${baseURL}posts`).then(async response => {
        setPostData(response?.data);
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error in fetched data',
      });
    }
    setDataLoading(false);
  };

  const PostItem = ({item}: PostItemInterface) => {
    return (
      <TouchableOpacity
        style={[styles.item, globalStyles.mediumShadow]}
        onPress={() =>
          navigation.navigate(postDetailScreen, {
            detail: item,
          })
        }>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={postData}
        renderItem={({item}) => <PostItem item={item} />}
        style={styles.flatlist}
        ListEmptyComponent={() => {
          return (
            <View style={styles.emptyStyle}>
              {dataLoading ? (
                <ActivityIndicator size={'large'} color={Colors.Blue} />
              ) : (
                <Text>No Data Found</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: Colors.White,
    margin: 10,
    borderRadius: 10,
    borderColor: Colors.Grey,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: Colors.Black,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  body: {
    textTransform: 'capitalize',
    marginTop: 10,
  },
  flatlist: {
    marginTop: 10,
  },
  emptyStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: HEIGHT / 2,
  },
});

export default Posts;
