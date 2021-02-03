<template>
  <div class="page pages-statistic">
    <div class="container">
      <div class="hero bg-gray">
        <div class="hero-body">
          <h1>{{gCurrentSummary.user}}</h1>
          <p>Score: {{gCurrentSummary.score}}</p>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Questions</th>
            <th>Answers</th>
            <th class="text-center">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in gCurrentStatictic"
            :key="idx">
            <td class="text-capitalize">{{row.category}}</td>
            <td class="text-capitalize">{{row.question}}</td>
            <td class="text-capitalize">{{row.answer}}</td>
            <td
              class="text-center"
              :class="{
                'text-success': row.correct,
                'text-error': !row.correct
              }">{{row.value}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  middleware: ['mid-auth'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['gCurrentStatictic', 'gCurrentSummary']),
  },
  methods: {
  },
  created() {
  }
};
</script>