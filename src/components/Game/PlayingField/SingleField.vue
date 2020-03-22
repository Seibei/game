<template>
  <div
    @click="singleFieldHandler"
    :class="{ user: userColor, computer: computerColor, suspense: activeField === name }"
    class="single-field">
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    name: Number,
  },
  computed: {
    ...mapState([
      'activeField',
      'computerPoints',
      'userPoints',
    ]),
    userColor() {
      return this.userPoints.find(i => i === this.name);
    },
    computerColor() {
      return this.computerPoints.find(i => i === this.name);
    },
  },
  methods: {
    singleFieldHandler() {
      if (this.name !== this.activeField || this.computerColor || this.userColor) return;
      this.$store.dispatch('userPoints', this.name);
    },
  },
};
</script>

<style lang="scss">
  .single-field {
    cursor: pointer;
    background: #ececec;
    border: 1px solid #868686;
    width: 50px;
    height: 50px;
  }
  .suspense {
    background: blue;
  }
  .user {
    background: green;
  }
  .computer {
    background: red;
  }
</style>
