export const state = () => ({
  posts: []
});

export const getters = {
  setPosts: (state: any) => {
    return state.posts;
  }
}
export const mutations = {
  setPosts: (state: any, payload: any) => {
    state.posts = payload;
  }

}
export const actions = {
  async get_posts(context: any, payload: any) {
    const ip = await $axios.$get('http://icanhazip.com');
    context.commit('setPosts', ip);
  }
}
