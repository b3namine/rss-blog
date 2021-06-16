<template>
  <div>

    <v-col cols="12" class="d-flex flex-row">
      <v-col cols="3">
        menu
      </v-col>
      <v-col cols="8" class="d-flex flex-column">
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
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
        <div class="pagination_container ">
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
      resultCount: 0
    }
  },
  computed: {
    ...mapGetters({posts: 'posts/get_posts'}),
    totalPages: function () {
      if (this.resultCount === 0) {
        return 1
      } else {
        return Math.ceil(this.resultCount / this.itemsPerPage)
      }
    },
    /* eslint-disable */
    paginate: function () {
      if (!this.posts.item || this.posts.item.length !== this.posts.item.length) {
        return
      }
      this.resultCount = this.posts.item.length
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage
      return this.posts.item.slice(index, index + this.itemsPerPage)
    },
  },
  methods: {
    setPage: function (pageNumber) {
      this.currentPage = pageNumber
    },
  },
}
</script>

<style scoped>
.card {
  margin: 10px 0;
}

.pagination_container {
  margin: 20px 0;
}
</style>
