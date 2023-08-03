/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {globalStyles} from '../../utils/globalStyles';
import {Constants, HEIGHT} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {Colors} from '../../utils/theme/color';
import {text} from '../../utils/commonText';
import {PostItemInterface} from '../../utils/interface';
import {IMAGES} from '../../utils/images';

const Posts = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState<object[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {baseURL} = Constants;
  const {postDetailScreen} = text;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            setPostData([]);
            setDataLoading(true);
            getPostData();
          }}>
          <Image source={IMAGES.Refresh} style={{height: 30, width: 30}} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = () => {
    axios
      .get(`${baseURL}posts`)
      .then(response => {
        if (response && response.status === 200) {
          setPostData(response?.data);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error in fetched data',
          });
        }
      })
      .catch(function (error) {
        if (error.response) {
          Toast.show({
            type: 'error',
            text1: `${error.response.status} error`,
          });
        } else if (error.request) {
          console.log('Error ', error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
      .finally(() => {
        setDataLoading(false);
        setRefreshing(false);
      });
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getPostData();
            }}
          />
        }
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
