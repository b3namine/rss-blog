import ps from 'xml2js';

export const state = () => ({
  posts: []
});

export const getters = {
  get_posts: (state) => {
    return state.posts;
  },
  get_post: (state) => (id) => {
    return state.posts.item.filter((item) => item.guid[0] === id);
  }
}
export const mutations = {
  set_posts: (state, payload) => {
    state.posts = payload;
  }
}
export const actions = {
  async get_posts(context, payload) {
    const parser = new ps.Parser();
    this.$axios.get('/feed')
      .then(({data}) => {
        parser.parseString(data, (err, res) => {
          if (err) {
            console.log(err);
            return;
          }
          context.commit('set_posts', res.rss.channel[0]);
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
