<template>
  <header class="com-topbar navbar" v-if="isAuth">
    <section class="navbar-section">
      <nuxt-link to="/auth" class="btn btn-link">Auth</nuxt-link>
      <nuxt-link
        to="/"
        class="btn btn-link"
      >Game</nuxt-link>
      <nuxt-link
        to="/statistic"
        class="btn btn-link"
      >Statistic</nuxt-link>
    </section>
    <section v-if="isAuth" class="navbar-section">
      <span class="navbar-brand mr-2">
        <nuxt-link
          to="statistic"
          tag="span"
          class="badge"
          :class="{
            'badge-success': score >= 0,
            'badge-error': score < 0,
          }"
          :data-badge="score">
          {{userName}}
        </nuxt-link>
      </span>
      <span
        class="mr-2 btn btn-link"
        @click="logout">exit</span>
    </section>
  </header>
</template>


<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  props: ['userName'],
  computed: {
    ...mapGetters(['gCurrentSummary']),
    isAuth() {
      return !!this.userName;
    },
    score() {
      return this.gCurrentSummary.score;
    }
  },
  methods: {
    ...mapMutations(['mSetUser']),
    logout() {
      this.mSetUser(null);
      if (this.$route.name !== 'auth') {
        this.$router.replace('/auth');
      }
    }
  }
};
</script>


<style lang="scss">
.com-topbar {
  .badge-error::after {
    background-color: #e85600;
  }
  .badge-success::after {
    background-color: #32b643;
  }
}
</style>
