<template>
<div>
  <v-layout row>
    <v-expansion-panel expand>
      <v-flex xs12 class="outset">
      <!-- Request for the User -->
        <v-expansion-panel-content class="pl-4 pr-4 pt-2 pb-2 green lighten-2">
          <div slot="header">Trade Requests For You ({{requestsForUser().length}})</div>
          <v-list-tile avatar class="tile green lighten-2" v-for="(book, index) in requestsForUser()" v-bind:key="book.id">
            <v-list-tile-avatar>
              <a :href="book.previewLink" target="_blank">
                <img v-if="book.imageLink" v-bind:src="book.imageLink"/>
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
            <v-list-tile-action>
              <v-btn icon @click="log(book)" v-tooltip:left="{ html: 'Accept trade request' }">
                <v-icon class="add-icon green--text text--darken-4">done</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn icon @click="log(book)" v-tooltip:left="{ html: 'Decline trade request' }">
                <v-icon class="add-icon red--text text--darken-4">sync_disabled</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
        </v-expansion-panel-content>
    <!-- Request by the User -->
    <v-expansion-panel-content class="pl-4 pr-4 pt-2 pb-2 deep-orange lighten-2">
      <div slot="header">Your Trade Requests ({{requestsByUser().length}})</div>
          <v-list-tile avatar class="tile deep-orange lighten-2" v-for="(book, index) in requestsByUser()" v-bind:key="book.id">
            <v-list-tile-avatar>
              <a :href="book.previewLink" target="_blank">
                <img v-if="book.imageLink" v-bind:src="book.imageLink"/>
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
            <v-list-tile-action>
              <v-btn @click="log(book)" icon v-tooltip:left="{ html: 'Cancel trade request' }">
                <v-icon class="add-icon red--text text--darken-4">sync_disabled</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-expansion-panel-content>
    </v-expansion-panel-content>
      </v-flex>
  </v-expansion-panel>
  </v-layout>
</div>
</template>
<script>
import store from '../store.js'
import BookService from '../services/BookService'

export default {
  data () {
    return {
    }
  },
  props: ['books', 'log'],
  methods: {
    requestsForUser () {
      const requests = this.books.filter((book) => {
        return book.requestedBy && book.ownerId === this.$store.getters.user.id;
      });
      return requests;
    },
    requestsByUser() {
      const requestedBooks = this.books.filter((book) => {
        return book.requestedBy === this.$store.getters.user.id;
      });
      return requestedBooks;
    },
    //async addToMyBooks (book) {
    //  const imageLink = book.imageLinks ? book.imageLinks.smallThumbnail : "";
    //  this.books.push({
    //    author: book.authors ? book.authors.join(", ") : "unknown",
    //    title: book.title,
    //    previewLink: book.previewLink,
    //    imageLink: imageLink
    //  });
    //  try {
    //    const response = await BookService.addBook(book.title, book.authors, this.$store.getters.user.id, book.previewLink, imageLink);
    //    this.onAddSuccess(response);
    //  } catch (e) {
    //    this.onAddError(e);
    //  }
    },

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
  background: rgba(0, 0, 0, 0.117647) !important;
  transition: .3s cubic-bezier(.25,.8,.5,1);
}
.tile {
  max-width: 100%;
}
.outset { 
  padding-left: 0 !important; 
  padding-right: 0 !important;
}
</style>
