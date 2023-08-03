import axios from 'axios';
import {Constants} from '../utils/constants';

export const axiosInstance = axios.create({baseURL: Constants.baseURL});

export const fetchPostData = async () => {
  await axiosInstance
    .get('posts')
    .then(async response => {
      await console.log('response.data =>> ', response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log('error =>>', error);
    });
};
