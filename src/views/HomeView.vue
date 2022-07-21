<template>
  <section class="pt-9">
    <v-container>
      <v-row justify="center">
        <v-col
        cols="8">
          <users-table></users-table>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import usersTable from '@/components/usersTable.vue'

  export default {
    name: 'home-view',
    data: () => ({
      sesion: false,
      textSesion: ''
    }),
    components: {
      'users-table': usersTable
    },
  }
</script>