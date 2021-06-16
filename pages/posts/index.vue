<template>
  <div>
      <v-card
        v-for="(post,key) in posts.item"
        :key="key"
        class="mx-auto my-12"
        max-width="374"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>
        <v-img
          height="250"
          :lazy-src="!!post.enclosure && post.enclosure[0].$.url"
          :src="!!post.enclosure && post.enclosure[0].$.url"
        ></v-img>
        <v-card-title>{{ $text.newText(post.title) }}</v-card-title>
        <v-card-text>
          <v-row
            align="center"
            class="mx-0"
          >
          </v-row>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
        <v-card-actions>
          <v-btn
            color="deep-purple lighten-2"
            text
          >
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "posts",
  data() {
    return {
      isActive: false,
    }
  },
  computed: {
    ...mapGetters({posts: 'posts/get_posts'})
  }
}
</script>

<style scoped>

</style>
