<template>
    <div class="home" v-if="isAuthenticated">
        <ol>
            <li>{{ getUser.email }}</li>
            <li>{{ getUser.isEmailVerified }}</li>
            <li>{{ getProfile.firstName }}</li>
            <li>{{ getProfile.lastName }}</li>
        </ol>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: {},
    computed: {
        ...mapGetters([ 'isAuthenticated', 'getUser', 'getProfile']),
    },
    created() {},
    setup() {
        const state = ref({})

        return { state }
    }
}
</script>
