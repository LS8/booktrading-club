<template>
<div>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <h2>My books</h2>
        <v-list v-if="books.length">
          <v-list-tile avatar class="tile" v-for="(book, index) in books" v-bind:key="book.id">
              <v-list-tile-avatar>
              <a :href="book.previewLink" target="_blank">
              <img v-bind:src="book.imageLink"/>
              </a>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="book.author">
                <a :href="book.previewLink" target="_blank">
                {{book.title}} ({{book.author}})
                </a>
              </v-list-tile-title>

              <v-list-tile-title v-else>
                <a :href="book.previewLink" target="_blank">
                {{book.title}} (unknown)
                </a>
              </v-list-tile-title>

            </v-list-tile-content>
            <v-list-tile-action @click="removeBook(book, index)">
              <v-icon class="add-icon red--text">remove_circle</v-icon>
            </v-list-tile-action>
          </v-list-tile>

        </v-list>
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
  created () {
    BookService.getBooksByUser(this.$store.getters.user)
      .then( data => {
        try {
          const books = data.books;
          this.books = books;
        }
        catch (e) {
          console.log(e);
        }
      })
  },
  data () {
    return {
      searchTerm: '',
      results: [],
      books: [],
      searchPending: false
    }
  },
  computed: {
    formIsValid () {
      return this.searchTerm.trim() !== ''
    }
  },
  methods: {
    removeBook(book, index) {
      this.books.splice(index, 1);
      BookService.deleteBook(book.id) // pass user id to verify?
    },
    addToMyBooks (book) {
      this.books.push({
        author: book.authors ? book.authors.join(", ") : "unknown",
        title: book.title,
        previewLink: book.previewLink,
        imageLink: book.imageLinks.smallThumbnail
      });
      BookService.addBook(book.title, book.authors, this.$store.getters.user, book.previewLink, book.imageLinks.smallThumbnail)
        .then( data => {
          try {
            this.onAddSuccess(data);
          }
          catch (e) {
            this.onAddError(e, data);
          }
        })
    },
    onAddSuccess (data) {
    },
    onAddError (error, data) {
      console.log(error, data)
    },
    onSubmit () {
      this.results = [];
      this.searchPending = true;
      BookService.searchBook(this.searchTerm)
        .then( data => {
          try {
            this.onSubmitSuccess(data);
          }
          catch (e) {
            this.onSubmitError(e, data);
          }

        });
    },
    onSubmitSuccess (data) {
      this.searchPending = false;
      data.info.forEach((book) => {
        book.volumeInfo.id = book.id;
        this.results.push(book.volumeInfo);
      })
    },
    onSubmitError (error, data) {
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
