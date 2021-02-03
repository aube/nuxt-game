<template>
<div class="page pages-auth">
  <div
    v-if="!currentUser"
    class="card">
    <div class="card-header">
      <div class="card-title h5">Auth</div>
      <div class="card-subtitle text-gray">Please set your name</div>
    </div>

    <div class="card-body">
      <div
        class="form-group"
        :class="{
          'has-success': usernameValidation,
          'has-error': usernameValidation === false
        }">
        <input
          v-model="userName"
          class="form-input"
          type="text"
          placeholder="Name">
      </div>
    </div>

    <div class="card-footer">
      <button
        class="btn btn-primary input-group-btn"
        @click="setName"
      >Submit</button>
    </div>
  </div>

  <div
    v-else
    class="card">
    <div class="card-header">
      <div class="card-title h5">Hello, {{currentUser}}!</div>
    </div>

    <div class="card-footer text-center">
      <button
        class="btn btn-primary input-group-btn"
        @click="startGame"
      >Start the game</button>
    </div>
  </div>
</div>

</template>

<script>

    
    
import { mapState, mapMutations, mapActions } from 'vuex';

export default {

  data() {
    return {
      userName: '',
    };
  },

  computed: {
    ...mapState({
      currentUser: 'userName'
    }),

    usernameValidation() {
      if (!this.userName) {
        return null;
      }
      return !!this.userName.match(/^[ЁёА-яA-z\d]*$/);
    }
  },

  methods: {
    ...mapMutations(['mSetUser']),
    ...mapActions(['aCategories']),
    setName() {
      if (this.usernameValidation) {
        this.mSetUser(this.userName);
        this.userName = '';
      }
    },
    startGame() {
      this.aCategories();
      this.$router.replace('/game');
    }
  }

};
</script>

<style lang="scss">
.pages-auth {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
