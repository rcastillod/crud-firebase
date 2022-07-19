<template>
    <section>
        <v-container fill-height>
            <v-row justify="center">
                <v-col cols="3">
                    <login-form></login-form>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
    name: 'login-view',
    // props: {},
    data: function(){
        return {}
    },
    // computed: {},
    //methods: {}
    // watch: {},
    components: {
        'login-form': LoginForm
    },
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped lang="scss">
section {
    height: 100vh;
}
</style>