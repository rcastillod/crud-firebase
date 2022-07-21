<template>
    <v-app-bar 
    app 
    color="#E11D90" 
    dark>
        <div class="d-flex align-center text-h5 font-weight-bold">
            Tabla de Usuarios
        </div>
        <v-spacer></v-spacer>
        <v-btn 
        color="#170035" 
        class="ma-2"
        outlined
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