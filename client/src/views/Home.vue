<template>
    <div class="home">
        <p>Email: {{ state.data.email }}</p>
        <p>Email Verified: {{ state.data.isEmailVerified }}</p>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: {},
    computed: {
        ...mapGetters(['getUser']),
    },
    created() {
        this.state.data = this.getUser;
    },
    setup() {
        const state = reactive({
            data: {}
        })

        return { state }
    }
}
</script>
