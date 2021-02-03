<template>
  <div class="page pages-index">
    <div class="container">
      <div
          v-if="selectedClue"
          class="card question-card">
        <div class="card-header">
          <div class="card-title h5 text-capitalize">{{selectedClue.category}}, {{selectedClue.value}}</div>
          <div class="card-subtitle text-gray">Answer: <u class="c-hand" @click="answer = selectedClue.answer">{{selectedClue.answer}}</u></div>
        </div>
        <div class="card-body">
          <b>Question:</b> {{selectedClue.question}}
          <div
            v-if="!answerIsSent"
            class="columns">
            <div class="column">
              <div class="form-group">
                <input
                  v-model="answer"
                  class="form-input"
                  type="text"
                  placeholder="Please type answer">
              </div>
            </div>
            <div class="column ok-btn-wrap">
              <button
                class="btn btn-primary"
                @click="sendAnswer">Ok ({{tak}})</button>
            </div>
          </div>
          <div
            v-else-if="correctAnswer"
            class="toast toast-success">
              Correct answer
          </div>
          <div
            v-else
            class="toast toast-error">
              Wrong answer
          </div>
        </div>
      </div>
      
      <div v-else-if="categories.length">
        <table
          class="table">
          <thead>
            <tr>
              <th>Category</th>
              <th class="text-center" colspan="5">Questions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="cat in categories"
              :key="cat.id">
              <td class="text-capitalize">{{cat.title}}</td>
              <td
                v-for="clue in (cluesByCategory[cat.id])"
                :key="clue.id"
                :class="{
                  'c-hand': !clue.fired,
                  'fired': clue.fired
                }"
                class="clue text-center"
                @click="selectClue(clue)"
              >
                <span v-if="clue.fired">
                  -
                </span>
                <span v-else>
                  {{clue.value}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="text-right">
          <button
            class="btn btn-primary input-group-btn mt-2"
            @click="stopGame"
          >Stop the game</button>
        </div>
      </div>

      <div
        v-else
        class="card-footer text-center">
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

import { EMPTY_VALUE_SCORE, EMPTY_VALUE_VIEW, TIME_TO_ANSWER } from '../config';


export default {
  middleware: ['mid-auth'],
  data() {
    return {
      selectedClue: null,
      tak: 0,
      answer: '',
      correctAnswer: false,
      answerIsSent: false,
    };
  },
  computed: {
    ...mapState(['categories', 'cluesByCategory']),
    timeIsOver() {
      return this.tak <= 0;
    }
  },
  methods: {
    ...mapMutations(['mAddStatictic', 'mSetCategories']),
    ...mapActions(['aCategories']),
    resetTimer() {
      if (this.si) {
        clearInterval(this.si);
      }
    },
    tik() {
      this.tak--;
      if (this.tak <= 0) {
        this.sendAnswer();
      }
    },
    selectClue(clue) {
      if (clue.fired) return;
      this.selectedClue = clue;
      this.tak = TIME_TO_ANSWER;
      this.resetTimer();
      this.si = setInterval(this.tik, 1000);
    },
    checkupAnswer() {
      return this.selectedClue.answer === this.answer;
    },
    sendAnswer() {
      let value = this.selectedClue.value;
      value = value === EMPTY_VALUE_VIEW ? EMPTY_VALUE_SCORE : value;

      this.correctAnswer = this.checkupAnswer();
      this.mAddStatictic({
        category: this.selectedClue.category,
        question: this.selectedClue.question,
        answer: this.selectedClue.answer,
        value,
        correct: this.correctAnswer,
        time: this.tak,
      });
      this.selectedClue.fired = true;
      this.answerIsSent = true;
      this.resetTimer();
      setTimeout(this.clearAnswer, 3000);
    },
    clearAnswer() {
      this.answerIsSent = null;
      this.selectedClue = null;
      this.answer = '';
    },
    startGame() {
      this.aCategories();
    },
    stopGame() {
      this.mSetCategories([]);
    }
  },
  created() {
  }
};
</script>

<style lang="scss">
.pages-index {
  margin: 0 auto;
  .ok-btn-wrap {
    display: flex;
    flex: 0 1;
    align-items: flex-end;
  }
  .clue:hover {
    background-color: #eee;
  }
  .clue.fired:hover {
    background-color: transparent;
  }
  .question-card {
    max-width: 555px;
  }
}
</style>
