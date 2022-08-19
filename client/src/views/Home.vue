<template>
    <div>
        <div>
            <GMapMap :center="center" :zoom="17" map-type-id="terrain" style="width: 100%; height: 100vh">
                <GMapMarker :key="id" :position="center" />
            </GMapMap>
        </div>
        <div class="position">
            <div >
                <button @click="getLocation()">Get Location</button>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';

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
            longitude: 0.0,
            center: { lat: 51.093048, lng: 6.842120 },
            id: '3a17f42a4efce004'
        }
    },
    methods: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.center.lat = position.coords.latitude;
                        this.center.lng = position.coords.longitude;
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

<style scoped>
.position {
    position: absolute;
    bottom: 10%;
    left: 91%;
    font-size: large;
}
</style>