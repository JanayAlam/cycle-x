<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card card-body mt-5 c-card p-5">
                    <LoginForm :submitHandler="submitHandler" :data="state.data" :v$="v$" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LoginForm from '@/components/forms/LoginForm.vue';
import { computed } from '@vue/reactivity';
import useVuelidate from '@vuelidate/core';
import { email, minLength, required } from '@vuelidate/validators';
import { reactive } from 'vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Login',
    components: { LoginForm },
    computed: {
        ...mapGetters(['getUser']),
    },
    setup(_props) {
        document.title = 'Login';

        const state = reactive({
            data: {
                email: '',
                password: '',
            }
        });

        // validations
        const rules = computed(() => {
            return {
                email: { required, email },
                password: { required, minLength: minLength(4) },
            }
        });
        const v$ = useVuelidate(rules, state.data);

        return { v$, state };
    },
    methods: {
        async submitHandler() {
            this.v$.$validate();
            if (this.v$.$error) return;

            try {
                await this.$store.dispatch('LOGIN', this.state.data);
                console.log(this.getUser);
                this.$router.push({ name: 'home' });
            } catch (e) {
                console.log(e.message);
                // alert('Failed' + e.message);
                // console.log(e.response.data.message);
            }

        },
    },
}
</script>

<style scoped>
</style>
