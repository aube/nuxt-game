<template>
  <div>
    <com-topbar :user-name="userName"></com-topbar>
    <Nuxt ></Nuxt>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userName'])
  }
};
</script>


<style lang="scss">
.page {
  min-height: 100vh;
}
.card {
  min-width: 300px;
}
</style>
