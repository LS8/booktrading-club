<template>
<div>
  <v-layout row wrap>
    <v-flex xs12>
      <requests :allow="allowTradeRequest" :decline="declineTradeRequest" :cancel="cancelTradeRequest" :books="books" v-if="$store.getters.isUserLoggedIn"/>
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
                <a :href="book.previewLink" :class="bookColor(book)" target="_blank">
                {{book.title}} ({{book.author}})
                </a>
              </v-list-tile-title>

              <v-list-tile-title v-else>
                <a :href="book.previewLink" :class="bookColor(book)" target="_blank">
                {{book.title}} (unknown)
                </a>
              </v-list-tile-title>

            </v-list-tile-content>
            <v-list-tile-action v-if="$store.state.user">
              <v-btn v-if="!userIsOwner(book) && book.requestedBy === 0" @click="requestTrade(book, index)" icon v-tooltip:left="{ html: 'Request this book' }">
                <v-icon class="add-icon green--text">swap_horiz</v-icon>
              </v-btn>
              <v-btn v-else icon v-tooltip:left="{ html: 'You cannot request this book' }">
                <v-icon class="add-icon deactivated grey--text">swap_horiz</v-icon>
              </v-btn>
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
import Requests from './Requests.vue'

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
  computed:{
  },
  methods: {
    async allowTradeRequest(book) {
      try {
        const updatedBook = await BookService.allowTradeRequest(book.id);
        book.ownerId = book.requestedBy;
        book.requestedBy = 0;
      } catch (e) {
        console.log(e);
      }
    },
    async declineTradeRequest(book) {
      try {
        await BookService.declineTradeRequest(book.id);
        book.requestedBy = 0;
      } catch (e) {
        console.log(e);
      }
    },
    async cancelTradeRequest(book) {
      try {
        await BookService.cancelTradeRequest(book.id);
        book.requestedBy = 0;
      } catch (e) {
        console.log(e);
      }
    },
    bookColor: function(book){
        let text = '';
        if(this.userIsOwner(book)){
            text = 'cyan--text';
        }
        return text;
    },
    userIsOwner: function (book) {
      if (this.$store.getters.user && this.$store.getters.user.id === book.ownerId) {
        return true;
      } else {
        return false;
      }
    },
    async requestTrade (book, index) {
      if (this.userIsOwner(book) || book.requestedBy) {
        return;
      }
      try {
        const requestedBook = await BookService.requestTrade(book.id, this.$store.state.user);
        book.requestedBy = requestedBook.book.requestedBy;
      } catch (e) {
        console.log(e);
      }
    }
  },
  components: {
    'requests': Requests
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
