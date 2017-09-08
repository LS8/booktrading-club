<template>
<div>
  <h1>Profile</h1>
  <v-layout row wrap>

    <v-flex xs12 sm6>
      <h2>Your books</h2>
    </v-flex>

    <v-flex xs12 sm6>
      <h2>Add a book</h2>
        <form v-if="!searchPending" @submit.prevent="onSubmit">
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <v-text-field
              v-model="searchTerm"
              name="searchTerm"
              label="Search the library"
              required
              ></v-text-field>
              <v-btn type="submit" primary :disabled="!formIsValid">Submit</v-btn>
            </v-flex>
          </v-layout>
        </form>
        <v-progress-circular v-if="!results.length && searchPending" indeterminate v-bind:size="50" class="primary--text"></v-progress-circular>

        <v-list v-if="results.length" subheader>
          <v-subheader>Search Results</v-subheader>

          <v-list-tile avatar class="tile" v-for="book in results" v-bind:key="book.id">
              <v-list-tile-avatar>
              <a :href="book.previewLink" target="_blank">
              <img v-if="book.imageLinks" v-bind:src="book.imageLinks.smallThumbnail"/>
              </a>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="book.authors">
                <a :href="book.previewLink" target="_blank">
                {{book.title}} ({{book.authors.join(", ")}})
                </a>
              </v-list-tile-title>

              <v-list-tile-title v-else>
                <a :href="book.previewLink" target="_blank">
                {{book.title}} (unknown)
                </a>
              </v-list-tile-title>

            </v-list-tile-content>
            <v-list-tile-action @click="addToMyBooks(book)">
              <v-icon class="add-icon blue--text">library_add</v-icon>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>



    </v-flex>

  </v-layout>
</div>
</template>
<script>
import store from '../store.js'
import BookService from '../services/BookService'

export default {
  beforeRouteEnter (to, from, next) {
    if (store.getters.auth) {
      next();
    } else {
      next('/login');
    }
  },
  data () {
    return {
      searchTerm: '',
      results: [],
      searchPending: false
    }
  },
  computed: {
    formIsValid () {
      return this.searchTerm.trim() !== ''
    }
  },
  methods: {
    addToMyBooks (book) {
      console.log(book)
    },
    onSubmit () {
      this.results = [];
      this.searchPending = true;
      BookService.searchBook(this.searchTerm)
        .then( data => {
          try {
            this.handleSuccess(data);
          }
          catch (e) {
            this.handleRejection(e, data);
          }

        });
    },
    handleSuccess (data) {
      this.searchPending = false;
      data.info.forEach((book) => {
        book.volumeInfo.id = book.id;
        this.results.push(book.volumeInfo);
      })
    },
    handleRejection (error, data) {
      console.log(error, data)
    }
  }

}

</script>

<style scoped>
a {
  text-decoration: none;
  color: rgba(0,0,0,.87);
}
.add-icon {
  cursor: pointer;
}
.tile:hover {
  background: rgba(0, 0, 0, 0.117647);
  transition: .3s cubic-bezier(.25,.8,.5,1);
}
</style>
