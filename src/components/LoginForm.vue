<template>
    <v-card>
        <v-form 
            v-model="valid" 
            ref="form">
            <v-container>
                <v-col cols="12" v-if="alertError">
                    <v-alert 
                        :value="alertError" 
                        text 
                        type="error" 
                        icon="mdi-alert-circle"
                        transition="scale-transition">
                        Debes ingresar todo los campos requeridos!
                    </v-alert>
                </v-col>
                <v-row>
                    <v-col cols="12">
                        <h2>Login</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field 
                            v-model="email" 
                            :rules="emailRules" 
                            label="E-mail" 
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field 
                            v-model="password"
                            :rules="passwordRules" 
                            label="Password"
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            depressed
                            color="primary"
                            @click="login"
                        >Ingresar</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'login-form',
    // props: {},
    data: function(){
        return {
            valid: false,
            alertError: null,
            email: '',
            emailRules: [
                v => !!v || 'El correo es obligatorio',
                v => /.+@.+/.test(v) || 'El correo debe ser valido',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'La contraseña es obligatoria',
                v => v.length >= 8 || 'La contraseña debe tener al menos 8 caracteres',
            ],
        }
    },
    // computed: {},
    methods: {
        login() {
            this.$refs.form.validate()
            console.log(this.$refs.form.validate())
            if ( !this.validate ) return this.alertError = true
            return this.alertError = false
        }
    }
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>