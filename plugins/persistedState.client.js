// ~/plugins/persistedState.client.js

import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  createPersistedState({
    key: 'nuxt-game',
    paths: ['statistic']
  })(store);
};