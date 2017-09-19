<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <panel title="All books">
        <v-list v-if="books.length">
          <v-list-tile avatar class="tile" v-for="(book, index) in books" v-bind:key="book.id">
              <v-list-tile-avatar>
              <a :href="book.previewLink" target="_blank">
              <img v-if="book.imageLink" v-bind:src="book.imageLink"/>
              </a>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-if="book.author">
                <a :href="book.previewLink" v-bind:class="userIsOwner(book)" target="_blank">
                {{book.title}} ({{book.author}})
                </a>
              </v-list-tile-title>

              <v-list-tile-title v-else>
                <a :href="book.previewLink" target="_blank">
                {{book.title}} (unknown)
                </a>
              </v-list-tile-title>

            </v-list-tile-content>
            <v-list-tile-action v-if="$store.state.user">
              <v-icon @click="requestTrade(book)" v-if="!userIsOwner(book) && book.requestedBy === 0" class="add-icon green--text">swap_horiz</v-icon>
              <v-icon v-else class="add-icon deactivated grey--text">swap_horiz</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <slot v-else>
          There are no books for trade
        </slot>
      </panel>
    </v-flex>
    </v-layout>
</div>
</template>
<script>
import BookService from '../services/BookService'

export default {
  async created () {
    try {
      const data = await BookService.getAllBooks();
      this.books = data.books || [];
    } catch (e) {
      console.log(e);
    }
  },
  data () {
    return {
      books: []
    }
  },
  methods: {
    userIsOwner: function (book) {
      if (this.$store.state.user && this.$store.state.user.id === book.ownerId) {
        return 'cyan--text';
      } else {
        return false;
      }
    },
    async requestTrade (book) {
      if (this.userIsOwner(book) || book.requestedBy) {
        return;
      }
      try {
        const requestedBook = await BookService.requestTrade(book.id, this.$store.state.user);
        book.requestedBy = requestedBook.requestedBy;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgba(0,0,0,.87);
}
.tile:hover {
  background: rgba(0, 0, 0, 0.117647);
  transition: .3s cubic-bezier(.25,.8,.5,1);
}
.add-icon {
  cursor: pointer;
}
.deactivated {
  cursor: default;
}
</style>
