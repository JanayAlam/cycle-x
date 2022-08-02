<template>
    <div class="home" v-if="isAuthenticated">
        <ol>
            <li>{{ getUser.email }}</li>
            <li>{{ getUser.isEmailVerified }}</li>
            <li>{{ getProfile.firstName }}</li>
            <li>{{ getProfile.lastName }}</li>
        </ol>
        <button @click="getLocation()">Try It</button>
        <h1>{{ this.latitude }} latitude, {{ this.longitude }} longitude</h1>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import { computed } from '@vue/reactivity';

export default {
    name: 'Home',
    components: {},
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser', 'getProfile']),
    },
    created() { },
    setup() {
        const state = ref({})

        //getLocation();

        return { state }
    },
    data() {
        return {
            latitude: 0.0,
            longitude: 0.0
        }
    },
    methods: {
        getLocation: function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.latitude = position.coords.latitude;
                        this.longitude = position.coords.longitude;
                    },
                    error => {
                        console.log(error.message);
                    },
                )
            }
        }
    }
}

/*function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            },
            error => {
                console.log(error.message);
            },
        )
    }
}*/

</script>
