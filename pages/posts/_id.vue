<template>
  <div v-if="!!post">
    <h2>{{ $text.newText(post.title) }}</h2>
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
  </div>
</template>

<script>

export default {
  name: "posts-id",
  data() {
    return {
      post: {}
    }
  },
  mounted() {
    if(this.$store.getters['posts/get_posts'].length === 0){
      setTimeout(() => {
        this.post = this.$store.getters["posts/get_post"](this.$route.params.id)[0];
      }, 1000);
      return;
    }
    this.post = this.$store.getters["posts/get_post"](this.$route.params.id)[0];
  }

}
</script>

<style scoped>

</style>
