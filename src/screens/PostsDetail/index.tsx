import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {globalStyles} from '../../utils/globalStyles';
import {Colors} from '../../utils/theme/color';

const PostDetail = props => {
  const params = props.route.params.detail || {};

  return (
    <TouchableOpacity style={[styles.item, globalStyles.mediumShadow]}>
      <Text style={styles.userId}>User Id : {params.userId}</Text>
      <Text style={styles.title}>Title: {params.title}</Text>
      <Text style={styles.body}>
        <Text style={styles.title}>Description:</Text> {params.body}
      </Text>
    </TouchableOpacity>
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
  userId: {
    fontSize: 20,
    color: Colors.Black,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
});

export default PostDetail;
