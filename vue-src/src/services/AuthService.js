import Vue from 'vue';
import config from '../config';

const url = config.serverAddress;

export default {
  login(formData) {
    return Vue.http.post(`${url}/api/login`, {
      username: formData.username,
      password: formData.password
    })
    .then(onSuccess, onError);
  },
  register(formData) {
    return Vue.http.post(`${url}/api/register`, {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
    .then(onSuccess, onError);
  },
  logout() {
    localStorage.clear();
  },
  loggedIn() {
    return localStorage.getItem('user') ? true : false;
  }
}

const onSuccess = (response) => {
  return response.json();
}

const onError = (error) => {
  return console.log(error);
}
