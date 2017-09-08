import Vue from 'vue';
import config from '../config';

const url = config.serverAddress;

export default {
  searchBook(searchTerm) {
    return Vue.http.post(`${url}/api/searchBook`, {
      searchTerm: searchTerm
    })
    .then(onSuccess, onError);
  },
}

const onSuccess = (response) => {
  return response.json();
}

const onError = (error) => {
  return console.log(error);
}
