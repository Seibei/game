import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameSettings: {},
    userName: '',
    selectedSettings: { name: 'Pick game mode', settings: {} },
    fieldsArray: [],
    fieldsArraySnapshot: [],
    userPoints: [],
    computerPoints: [],
    activeField: null,
    delay: 0,
    totalFields: 0,
    winnerMessage: '',
    winners: [],
    isGameProcess: false,
  },
  getters: {
    formattedGameSettings(state) {
      return Object.keys(state.gameSettings).map(mode => {
        const formatName = `${mode[0].toUpperCase()}${mode.replace(/Mode/, '').slice(1)}`;
        return { name: formatName, settings: state.gameSettings[mode] };
      });
    },
  },
  mutations: {
    setGameSettings(state, settings) {
      state.gameSettings = { ...settings };
    },
    setWinners(state, winners) {
      state.winners = [...winners];
    },
    updateSelected(state, payload) {
      state[payload.type] = payload.value;
    },
    createFieldsArray(state, value) {
      const end = value * value;
      state.fieldsArray = Array.from({ length: end }, (_, i) => i + 1);
      state.fieldsArraySnapshot = [...state.fieldsArray];
      state.totalFields = value * value;
    },
    setDelay(state, delay) {
      state.delay = delay;
    },
    randomField(state) {
      state.activeField = state.fieldsArray[Math.floor(Math.random() * state.fieldsArray.length)];
    },
    deleteField(state, field) {
      state.fieldsArray = state.fieldsArray.filter(item => item !== field);
    },
    setComputerPoints(state, targ) {
      state.computerPoints.push(targ);
    },
    setUserPoints(state, targ) {
      state.userPoints.push(targ);
    },
    setWinner(state, winner) {
      state.winnerMessage = `${winner} won`;
    },
    setGameProcess(state, payload) {
      state.isGameProcess = payload;
    },
  },
  actions: {
    async fetchGameSettings({ commit }) {
      try {
        const res = await axios.get('https://starnavi-frontend-test-task.herokuapp.com/game-settings');
        commit('setGameSettings', res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async fetchWinners({ commit }) {
      try {
        const res = await axios.get('https://starnavi-frontend-test-task.herokuapp.com/winners');
        commit('setWinners', res.data);
      } catch (e) {
        console.log(e);
      }
    },
    async sendWinner({ dispatch }, winner) {
      try {
        await axios.post('https://starnavi-frontend-test-task.herokuapp.com/winners', {
          winner,
          date: new Date().toLocaleString(),
        });
        await dispatch('fetchWinners');
      } catch (e) {
        console.log(e);
      }
    },
    startGame({ commit, dispatch }) {
      dispatch('gameProcess');
      commit('setGameProcess', true);
    },
    gameProcess({ state, commit, dispatch }) {
      commit('randomField');
      const computer = state.computerPoints.length;
      const currentField = state.activeField;
      setTimeout(() => {
        if (state.fieldsArray.find(item => item === currentField)) {
          dispatch('computerPoints', currentField);
          if (state.fieldsArray.length > 0 && computer < Math.floor(state.totalFields / 2)) {
            dispatch('gameProcess');
          } else {
            commit('setWinner', 'computer');
            dispatch('sendWinner', 'computer');
            commit('setGameProcess', false);
          }
        }
      }, state.delay);
    },
    userPoints({ state, commit, dispatch }, field) {
      commit('setUserPoints', field);
      commit('deleteField', field);
      const user = state.userPoints.length;
      if (state.fieldsArray.length > 0 && user < Math.floor(state.totalFields / 2) + 1) {
        dispatch('gameProcess');
      } else {
        commit('setWinner', state.userName);
        dispatch('sendWinner', state.userName);
        commit('setGameProcess', false);
      }
    },
    computerPoints({ commit }, field) {
      commit('setComputerPoints', field);
      commit('deleteField', field);
    },
    clearGame({ state }) {
      state.computerPoints = [];
      state.userPoints = [];
      state.winnerMessage = '';
      state.activeField = null;
      state.fieldsArray = [...state.fieldsArraySnapshot];
    },
  },
});
