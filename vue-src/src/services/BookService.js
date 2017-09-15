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
  addBook(title, author, userId, previewLink, imageLink) {
    return Vue.http.post(`${url}/api/addBook`, {
      title: title,
      author: author,
      userId: userId,
      previewLink: previewLink,
      imageLink: imageLink
    })
    .then(onSuccess, onError);
  }
}

const onSuccess = (response) => {
  return response.json();
}

const onError = (error) => {
  return console.log(error);
}
