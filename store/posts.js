import ps from 'xml2js';

export const state = () => ({
  posts: [],
  currentPage: 1
});
export const getters = {
  get_posts: (state) => {
    return state.posts;
  },
  get_currentPage: (state) => {
    return state.currentPage;
  },
  get_post: (state) => (id) => {
    return state.posts.item.filter((item) => item.guid[0] === id);
  }
}
export const mutations = {
  set_posts: (state, payload) => {
    state.posts = payload;
  },
  set_currentPage: (state, payload) => {
    state.currentPage = payload;
  }
}
export const actions = {
  async get_posts(context, payload) {
    const parser = new ps.Parser();
    this.$axios.get('/feed')
      .then(({data}) => data)
      .then(async data => {
        parser.parseString(data, (err, res) => {
          if (err) {
            return this.$nuxt.error({statusCode: 404, message: 'Post not found'});
          }
          context.commit('set_posts', res.rss.channel[0]);
        });
      })
      .catch((error) => {
        return this.$nuxt.error({statusCode: 404, message: error});
      })
  },
  set_currentPage(context, payload) {
    context.commit('set_currentPage', payload);
  }
}
