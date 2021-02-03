
import Vue from 'vue';
import axios from 'axios';
import { EMPTY_VALUE_VIEW, EMPTY_CLUES } from '../config';


const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

export const state = () => ({
  userName: null,
  categories: [],
  cluesByCategory: {},
  statistic: {},
});


export const getters = {
  gCurrentStatictic(state) {
    return state.statistic[state.userName] || [];
  },
  gCurrentSummary(state) {
    let stat = state.statistic[state.userName] || [];
    let score = stat.reduce((sum, row) => {
      return sum + row.value * (row.correct ? 1 : -1);
    }, 0);

    return {
      user: state.userName,
      score
    };
  },
};


export const mutations = {
  mSetUser(state, payload) {
    state.userName = payload;
  },
  mSetCategories(state, payload) {
    state.categories = payload;
  },
  mSetClues(state, payload) {
    let { cat, clues } = payload;
    state.cluesByCategory = {
      ...state.cluesByCategory,
      [cat.id]: clues || [ ...EMPTY_CLUES ]
    };
  },
  mAddStatictic(state, payload) {
    let stat = state.statistic[state.userName] || [];
    stat.push(payload);
    Vue.set(state.statistic, state.userName, stat);
  }
};


export const actions = {
  async aClues(opts, cat) {
    let { commit } = opts;

    let clues = await axios.get('http://jservice.io/api/clues?category=' + cat.id);

    if (clues.status >= 400) {
      return false;
    }

    clues = clues.data.slice(0, 5);
    clues = clues.map(clue => {
      clue.category = clue.category.title;
      return {
        ...clue,
        value: clue.value || EMPTY_VALUE_VIEW,
      };
    });

    commit('mSetClues', {
      cat,
      clues
    });
  },

  async aCategories(opts, params) {
    let {dispatch, commit } = opts;
    let cats = await axios.get('http://jservice.io/api/categories?count=100');
    if (cats.status >= 400) {
      return false;
    }
    cats = cats.data.filter(c => c.clues_count >= 5);
    cats = shuffleArray(cats);
    cats = cats.slice(0, 5);

    cats.forEach(cat => {
      commit('mSetClues', {cat});
      dispatch('aClues', cat);
    });

    commit('mSetCategories', cats);
    return cats;
  },
};
