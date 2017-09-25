import Vue from 'vue';
import config from '../config';
import store from '../store';

const url = config.serverAddress;

export default {
  searchBook(searchTerm) {
    return Vue.http.post(`${url}/api/searchBook`, {
      searchTerm: searchTerm
    },{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
    .then(onSuccess, onError);
  },
  requestTrade(bookId, user) {
    return Vue.http.post(`${url}/api/requestTrade`, {
      bookId: bookId,
      user: user
    },{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
    .then(onSuccess, onError);
  },
  addBook(title, author, userId, previewLink, imageLink) {
    author = typeof author === "object" ? author.join(', ') : '';
    return Vue.http.post(`${url}/api/addBook`, {
      title: title.substring(0, 120),
      author: author,
      previewLink: previewLink,
      imageLink: imageLink
    },{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
    .then(onSuccess, onError);
  },
  getAllBooks() {
    return Vue.http.get(`${url}/api/books`)
      .then(onSuccess, onError);
  },
  getBooksByUser() {
    return Vue.http.get(`${url}/api/user-books/`,{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
      .then(onSuccess, onError);
  },
  deleteBook(bookId) {
    return Vue.http.delete(`${url}/api/book/${bookId}`,{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
      .then(onSuccess, onError);
  },
  allowTradeRequest(bookId) {
    return Vue.http.patch(`${url}/api/trade`, { bookId: bookId },{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
      .then(onSuccess, onError);
  },
  declineTradeRequest(bookId) {
    return Vue.http.patch(`${url}/api/trade/decline`, { bookId: bookId },{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
      .then(onSuccess, onError);
  },
  cancelTradeRequest(bookId) {
    return Vue.http.patch(`${url}/api/trade/cancel`, { bookId: bookId },{ headers: {
      Authorization: `Bearer ${store.state.token}`
    }})
      .then(onSuccess, onError);
  },
}

const onSuccess = (response) => {
  return response.json();
}

const onError = (error) => {
  return console.log(error);
}
