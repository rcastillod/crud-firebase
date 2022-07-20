<template>
  <section>
    <v-container>
      <v-row>
        <v-col
        cols="12">
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
