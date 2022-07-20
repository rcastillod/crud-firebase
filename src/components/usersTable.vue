<template>
    <div>
        <v-alert
            v-if="alertSuccess"
            text 
            type="success" 
            icon="mdi-account-check">
            {{alertSuccessMessage}}
        </v-alert>
        <v-data-table 
            :hide-default-footer="true" 
            :headers="headers" 
            :items="usuarios" 
            :items-per-page="5"
            :disable-sort="true" 
            class="elevation-1" 
            :loading="loader" 
            loading-text="Cargando usuarios... Por favor espere">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Listado Usuarios</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
    
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                                Agregar Usuario
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{formTitle}}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-form v-model="valid" ref="form">
                                    <v-container>
                                        <v-row>
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
                                            <v-col cols="12" sm="6">
                                                <v-text-field 
                                                    v-model="editedField.nombre" 
                                                    label="Nombre" 
                                                    :rules="nameField"
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field 
                                                    v-model="editedField.apellido" 
                                                    label="Apellido"
                                                    :rules="nameField" 
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field 
                                                    v-model="editedField.email" 
                                                    label="Email" 
                                                    :rules="emailField"
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field 
                                                    v-model="editedField.telefono" 
                                                    label="Teléfono"
                                                    :rules="nameField" 
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select 
                                                    :items="regiones" 
                                                    v-model="editedField.region" 
                                                    label="Región"
                                                    :rules="nameField" 
                                                    required></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-form>
                            </v-card-text>
    
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue darken-1" text @click="buttonAction">
                                    {{buttonTitle}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog 
                        v-model="dialogDelete"
                        max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">¿Seguro que deseas eliminar este usuario?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteUserConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
    
            <template v-slot:item.actions="{ item }">
                <v-icon 
                    color="primary"
                    small 
                    class="mr-2" 
                    @click="fillUser(item)">
                    mdi-pencil
                </v-icon>
                <v-icon
                    color="red" 
                    small 
                    @click="deleteUser(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { db } from '@/firebase/firebase.js'
import { doc, collection, addDoc, setDoc, deleteDoc } from '@firebase/firestore'

export default {
    name: 'users-table',
    data: function(){
        return {
            valid: true,
            alertError: false,
            alertSuccess: false,
            alertSuccessMessage: null,
            dialog: false,
            dialogDelete: false,
            editedUsuario: null,
            editedField: {
                nombre: null,
                apellido: null,
                email: null,
                telefono: null,
                region: null
            },
            defaultField: {
                nombre: null,
                apellido: null,
                email: null,
                telefono: null,
                region: null
            },
            headers: [
                { text: 'Nombre', value: 'nombre' },
                { text: 'Apellido', value: 'apellido' },
                { text: 'Email', value: 'email' },
                { text: 'Teléfono', value: 'telefono' },
                { text: 'Región', value: 'region' },
                { text: 'Acciones', value: 'actions' }
            ],
            regiones: [
                'Tarapacá',
                'Antofagasta',
                'Atacama',
                'Coquimbo',
                'Valparaíso',
                'OHiggins',
                'El Maule',
                'El Bío Bío',
                'La Araucanía',
                'Los Lagos',
                'Aysén',
                'Magallanes y Antártica Chilena',
                'Región Metropolitana de Santiago',
                'Los Ríos',
                'Arica y Parinacota',
                'Ñuble',
            ],
            nameField: [
                v => !!v || 'El campo es requerido',
            ],
            emailField: [
                v => !!v || 'E-mail es requerido',
                v => /.+@.+/.test(v) || 'Debes ingresar un e-mail valido',
            ],
        }
    },
    computed: {
        ...mapState(['usuarios', 'loader']),
        formTitle() {
            return this.editedUsuario === null ? 'Agregar nuevo usuario' : 'Editar usuario'
        },
        buttonTitle() {
            return this.editedUsuario === null ? 'Agregar' : 'Editar'
        },
        buttonAction() {
            return this.editedUsuario === null ? this.addNewUser : this.editUser
        }
    },
    methods: {
        ...mapActions(['getUsuario']),
        async addNewUser() {
            this.$refs.form.validate()
            if( !this.valid ) {
                this.alertError = true
            } else {
                try {
                    await addDoc( collection(db, "usuarios"), this.editedField)
                    this.close()
                    this.alertSuccessMessage = "El usuario ha sido agregado con éxito!"
                    this.alertSuccess = true
                }
                catch(error) {
                    console.log(error)
                }
            }
        },
        fillUser(item) {
            let editedUsuario = this.usuarios.find( usuario => usuario.id == item.id )
            this.editedUsuario = editedUsuario.id
            this.editedField = Object.assign({}, editedUsuario)
            this.dialog = true
        },
        async editUser() {
            this.$refs.form.validate()
            if( !this.valid ) {
                this.alertError = true
            } else {
                try {
                    const userRef = doc(db, "usuarios", this.editedUsuario)
                    await setDoc( userRef, this.editedField, { merge: true })
                    this.close()
                    this.alertSuccessMessage = "El usuario ha sido editado con éxito!"
                    this.alertSuccess = true
                }
                catch(error) {
                    console.log(error)
                }
            }
        },
        deleteUser(item) {
            let editedUsuario = this.usuarios.find( usuario => usuario.id == item.id )
            this.editedUsuario = editedUsuario.id
            this.editedField = Object.assign({}, editedUsuario)
            this.dialogDelete = true
        },
        async deleteUserConfirm() {
            try {
                await deleteDoc( doc(db, "usuarios", this.editedUsuario))
                this.closeDelete()
                this.alertSuccessMessage = "El usuario ha sido eliminado con éxito!"
                this.alertSuccess = true
            }
            catch(error) {
                console.log(error)
            }
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedField = Object.assign({}, this.defaultField)
                this.editedUsuario = -1
            })
        },
        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedUsuario = Object.assign({}, this.defaultField)
                this.editedUsuario = -1
            })
        },
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.getUsuario()
    }
}
</script>

<style scoped>
    
</style>