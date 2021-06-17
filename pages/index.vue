<template>
  <div>

    <v-col cols="12" class="d-flex flex-row">
      <v-col cols="3" class="grey darken-4 rounded mt-5 filter_block">
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="search"
            outlined
            label="Search..."
            prepend-inner-icon="mdi-text-box-search-outline"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          sm="12"
        >
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                outlined
                label="Filter by date"
                prepend-inner-icon="mdi-calendar"
                readonly
                clearable
                v-bind="attrs"
                @click:clear="date = null"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-col>
      <v-col cols="8" class="d-flex flex-column">
        <v-card v-if="!!postsFilterByWord && postsFilterByWord.length === 0">
          no post found
        </v-card>
        <v-card v-for="(post,key) in paginate"
                class="card"
                :key="key">
          <v-img
            height="250"
            :lazy-src="post.enclosure ? post.enclosure[0].$.url: 'https://cdn.shopify.com/s/files/1/0002/4680/8603/products/sjDBHUW_1600x1600.png?v=1606994170'"
            :src="post.enclosure ? post.enclosure[0].$.url: 'https://cdn.shopify.com/s/files/1/0002/4680/8603/products/sjDBHUW_1600x1600.png?v=1606994170'"
            aspect-ratio="1"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-title>{{ $text.newText(post.title) }}</v-card-title>
          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn
              color="deep-purple lighten-2"
              :to="'/posts/'+post.guid"
              text
            >Подробность
            </v-btn>
          </v-card-actions>
        </v-card>
        <div v-if="!!postsFilterByWord && postsFilterByWord.length > 0" class="pagination_container ">
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            circle
          ></v-pagination>
        </div>
      </v-col>

    </v-col>


  </div>

</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "posts",
  data() {
    return {
      isActive: false,
      currentPage: 1,
      itemsPerPage: 5,
      resultCount: 0,
      date: '',
      menu1: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({posts: 'posts/get_posts'}),
    postsFilterByDate() {
      if (!this.posts.item) {
        return;
      }
      if (!this.date) {
        return [...this.posts.item]
          .sort((postCurrent, postNext) => new Date(postNext.pubDate).toTimeString() - new Date(postCurrent.pubDate).toTimeString());
      }
      return [...this.posts.item]
        .sort((postCurrent, postNext) => new Date(postNext.pubDate).toTimeString() - new Date(postCurrent.pubDate).toTimeString())
        .filter((post) => this.formatDate(post.pubDate) === this.formatDate(this.date));
    },
    postsFilterByWord() {
      if (!this.postsFilterByDate) {
        return;
      }
      if (!this.search || this.search.length <= 3) {
        return [...this.postsFilterByDate];
      }

      return [...this.postsFilterByDate].filter((post) => this.$text.newText(post.title).split(' ').some((w) => w === this.search));
    },
    totalPages() {
      if (this.resultCount === 0) {
        return 1;
      } else {
        return Math.ceil(this.resultCount / this.itemsPerPage);
      }
    },
    paginate() {
      if (!this.postsFilterByWord) {
        return;
      }
      this.resultCount = this.postsFilterByWord.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.postsFilterByWord.slice(index, index + this.itemsPerPage);
    },
  },
  methods: {
    formatDate(date) {
      const day = new Date(date).getDate();
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      return `${day}-${month}-${year}`;
    }
  }
}
</script>

<style scoped>
.card {
  margin: 10px 0;
}

.filter_block {
  height: fit-content;
}

.pagination_container {
  margin: 20px 0;
}
</style>
