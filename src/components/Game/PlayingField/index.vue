<template>
  <div class="playing-field">
    <h1>{{ winnerMessage }}</h1>
    <div
      class="wrapper"
      :style="`width: ${selected.field * 50}px`">
      <SingleField
        v-for="(item, index) in selected.field * selected.field || []"
        :key="index"
        :name="index + 1" />
    </div>
  </div>
</template>

<script>
import SingleField from './SingleField.vue';

export default {
  components: {
    SingleField,
  },
  computed: {
    winnerMessage() {
      return this.$store.state.winnerMessage;
    },
    selected() {
      return this.$store.state.selectedSettings.settings;
    },
  },
};
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-wrap: wrap;
  }
</style>
