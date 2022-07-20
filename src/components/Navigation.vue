<template>
    <v-app-bar 
    app 
    color="primary" 
    dark>
        <div class="d-flex align-center">
            <v-img 
            alt="Vuetify Logo" 
            class="shrink mr-2" 
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
            width="40" />
            <v-img 
            alt="Vuetify Name" 
            class="shrink mt-1 hidden-sm-and-down" 
            contain 
            min-width="100"
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
        </div>
        <v-spacer></v-spacer>
        <v-btn 
        color="red darken-3" 
        class="ma-2 white--text" 
        @click="logOut">
            Cerrar Sesión
            <v-icon right dark>
                mdi-logout-variant
            </v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
    name: 'navigation-bar',
    data: function(){
        return {}
    },
    methods: {
        async logOut() {
            const auth = getAuth();
            try {
                let logout = await signOut(auth)
                console.log(logout)
                this.$router.push('/login')
            }
            catch(error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
    
</style>