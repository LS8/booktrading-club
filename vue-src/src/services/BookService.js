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
  requestTrade(bookId, user) {
    return Vue.http.post(`${url}/api/requestTrade`, {
      bookId: bookId,
      user: user
    })
    .then(onSuccess, onError);
  },
  addBook(title, author, userId, previewLink, imageLink) {
    author = typeof author === "object" ? author.join(', ') : '';
    return Vue.http.post(`${url}/api/addBook`, {
      title: title,
      author: author,
      ownerId: userId,
      previewLink: previewLink,
      imageLink: imageLink
    })
    .then(onSuccess, onError);
  },
  getAllBooks() {
    return Vue.http.get(`${url}/api/books`)
      .then(onSuccess, onError);
  },
  getBooksByUser(userId) {
    return Vue.http.get(`${url}/api/books/${userId}`)
      .then(onSuccess, onError);
  },
  deleteBook(bookId) {
    return Vue.http.delete(`${url}/api/book/${bookId}`)
      .then(onSuccess, onError);
  },
  allowTradeRequest(bookId) {
    return Vue.http.patch(`${url}/api/trade`, { bookId: bookId })
      .then(onSuccess, onError);
  },
  declineTradeRequest(bookId) {
    return Vue.http.patch(`${url}/api/trade/decline`, { bookId: bookId })
      .then(onSuccess, onError);
  },
  cancelTradeRequest(bookId) {
    return Vue.http.patch(`${url}/api/trade/cancel`, { bookId: bookId })
      .then(onSuccess, onError);
  },
}

const onSuccess = (response) => {
  return response.json();
}

const onError = (error) => {
  return console.log(error);
}
