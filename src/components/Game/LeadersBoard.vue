<template>
  <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in winners"
          :key="index">
          <td>{{ item.winner }}</td>
          <td>{{ item.date }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  computed: {
    winners() {
      return this.$store.state.winners;
    },
  },
};
</script>
