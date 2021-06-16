<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      app
    >
      <v-toolbar-title v-text="$text.newText(posts.title)"/>
      <v-spacer/>
      <v-btn v-for="(item, key) in items" :key="key" :to="item.to" exact icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
      <v-spacer/>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      clipped: false,
      items: [
        {
          icon: 'mdi-home-variant-outline',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-post',
          title: 'Posts',
          to: '/posts'
        }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('posts/get_posts');
  },
  computed: {
    ...mapGetters({posts: 'posts/get_posts'})
  },
  methods: {}
}
</script>
