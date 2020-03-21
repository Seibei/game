<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <PlayerForm />
        <PlayingField />
      </v-col>
      <v-col>
        <LeadersBoard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlayerForm from './Form/index.vue';
import PlayingField from './PlayingField/index.vue';
import LeadersBoard from './LeadersBoard.vue';

export default {
  components: {
    PlayerForm,
    PlayingField,
    LeadersBoard,
  },
  created() {
    this.$store.dispatch('fetchGameSettings');
    this.$store.dispatch('fetchWinners');
  },
};
</script>
