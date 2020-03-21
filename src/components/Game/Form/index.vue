<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col md="4">
          <v-select
            v-model="selected"
            :items="gameSettings"
            item-text="name"
            label="Pick game mode"
            :disabled="isGameProcess"
            persistent-hint
            return-object
            filled
            required
          ></v-select>
        </v-col>
        <v-col md="4">
          <v-text-field
            v-model="userName"
            label="Enter your name"
            :rules="[v => !!v || 'Name is required']"
            :disabled="isGameProcess"
            required
            filled
          ></v-text-field>
        </v-col>
        <v-col md="4">
          <v-btn
            large
            color="primary"
            :disabled="!valid || isGameProcess"
            @click="play"
          >
            {{ buttonTitle }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    buttonTitle: 'PLAY',
    valid: true,
  }),
  computed: {
    selected: {
      get() {
        return this.$store.state.selectedSettings;
      },
      set(value) {
        this.$store.commit('updateSelected', { type: 'selectedSettings', value });
        this.$store.commit('createFieldsArray', value.settings.field);
        this.$store.commit('setDelay', value.settings.delay);
        this.$store.dispatch('clearGame');
      },
    },
    userName: {
      get() {
        return this.$store.state.userName;
      },
      set(value) {
        this.$store.commit('updateSelected', { type: 'userName', value });
      },
    },
    isGameProcess() {
      return this.$store.state.isGameProcess;
    },
    gameSettings() {
      return this.$store.getters.formattedGameSettings;
    },
  },
  methods: {
    play() {
      this.$store.dispatch('clearGame');
      this.$store.dispatch('startGame');
      this.buttonTitle = 'PLAY AGAIN';
    },
  },
};
</script>
