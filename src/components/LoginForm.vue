<template>
    <v-card 
    class="form-card pa-5"
    color="rgba(0,0,0,0.3)"
    elevation="20">
        <v-form 
            v-model="valid" 
            ref="form">
            <v-container>
                <v-col cols="12" v-if="alertError">
                    <v-alert 
                        :value="alertError"
                        outlined
                        color="white"
                        text 
                        type="error" 
                        icon="mdi-alert-circle"
                        transition="scale-transition">
                        {{alertMessage}}
                    </v-alert>
                </v-col>
                <v-row>
                    <v-col cols="12">
                        <h2 class="text-h4 font-weight-bold white--text">Login</h2>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-text-field 
                            v-model="email" 
                            :rules="emailRules"
                            prepend-icon="mdi-account-outline"
                            label="E-mail"
                            dark
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field 
                            v-model="password"
                            :rules="passwordRules"
                            prepend-icon="mdi-key-outline"
                            label="Password"
                            dark
                            required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            depressed
                            color="#E11D90"
                            dark
                            @click="login"
                        >Ingresar</v-btn>
                    </v-col>
                    <v-col>
                        <v-divider dark></v-divider>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center">
                        <div class="text-caption white--text">¿Aun no tiene una cuenta?</div>
                        <div class="text-caption font-weight-bold white--text ml-2" @click="registerLink">Regístrate</div>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'login-form',
    data: function(){
        return {
            valid: false,
            alertError: null,
            alertMessage: '',
            email: '',
            emailRules: [
                v => !!v || 'El correo es obligatorio',
                v => /.+@.+/.test(v) || 'El correo debe ser valido',
            ],
            password: '',
            passwordRules: [
                v => !!v || 'La contraseña es obligatoria',
                v => v.length >= 6 || 'La contraseña debe tener al menos 8 caracteres',
            ],
        }
    },
    methods: {
        async login() {
            this.$refs.form.validate()
            if ( this.valid == false ) {
                this.alertError = true
                this.alertMessage = "Debes ingresar todo los campos requeridos!"
            } else {
                this.alertError = false
                const auth = getAuth()
                try {
                    let log = await signInWithEmailAndPassword(auth, this.email, this.password)
                    console.log(log)
                    this.$router.push('/')
                }
                catch(error) {
                    const errorCode = error.code
                    const errorMessage = error.message
                    console.log(errorCode, errorMessage)
                    this.alertError = true
                    this.alertMessage = "Tu usuario o contraseña son incorrectos."
                }
            }
        },
        registerLink() {
            this.$router.push('/register')
        }
    }
}
</script>

<style scoped lang="scss">
    
</style>