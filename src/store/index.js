import Vue from 'vue'
import Vuex from 'vuex'
import { db } from  '@/firebase/firebase.js'
import { collection, getDocs } from "firebase/firestore";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarios: [],
    loader: true
  },
  getters: {
  }, 
  mutations: {
    ADD_USUARIO(state, usuario) {
      state.usuarios.push({
        id: usuario.id,
        nombre: usuario.data().nombre,
        apellido: usuario.data().apellido,
        email: usuario.data().email,
        telefono: usuario.data().telefono,
        region: usuario.data().region
      })
    },
    RESET_USUARIO(state) {
      state.usuarios = []
    }
  },
  actions: {
    async getUsuario({ commit }) {
      try {
        let querySnapShot = await getDocs(collection(db, 'usuarios'))
        commit('RESET_USUARIO')
        this.state.loader = false
        querySnapShot.forEach((doc) => {
          commit('ADD_USUARIO', doc)
        })
      }
      catch(error) {
        console.log(error)
      }
    }
  },
  modules: {
  }
})
