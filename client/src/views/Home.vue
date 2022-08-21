<template>
    <div>
        <div>
            <GMapMap :center="currentUserLocation" :zoom="17" map-type-id="terrain" style="width: 100%; height: 100vh">
                <GMapCluster>
                    <GMapMarker :key="id" :position="currentUserLocation" :clickable="true" :draggable="true" />

                    <GMapMarker :key="'Banasree'" :position="cycleXHub1" :icon="hubIcon" :clickable="true"
                        :draggable="false" />
                    <GMapMarker :key="'Abul Hotel'" :position="cycleXHub2" :icon="hubIcon" :clickable="true"
                        :draggable="false" />
                    <GMapMarker :key="'Aarong Gulshan'" :position="cycleXHub3" :icon="hubIcon" :clickable="true"
                        :draggable="false" />
                </GMapCluster>
            </GMapMap>
        </div>
        <div v-if="isVisible" class="QR-code-reader">
            <div>
                <p>{{ error }}</p>
                <h1 class="bg-white">{{ decodedString }}</h1>
                <qrcode-stream @init="OnInit" @decode="onDecode"></qrcode-stream>
            </div>
        </div>
        <div class="position">
            <div>
                <button @click="getLocation()">Get Location</button>
                <button @click="getQRCode()">Camera</button>
            </div>
        </div>
    </div>

</template>

<script>
import { ref } from 'vue';
import { mapGetters } from 'vuex';
import { QrcodeStream } from 'vue3-qrcode-reader';

export default {
    name: 'Home',
    components: { QrcodeStream },
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
            //QR Code Variables
            error: '',
            decodedString: '',
            isVisible: false,

            //hubIcon: '../../../public/default/CycleX-Hub-Icon.png',
            hubIcon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
            currentUserLocation: { lat: 23.76850367011616, lng: 90.42554965500942 },
            rootLocation: { lat: 23.76850367011616, lng: 90.42554965500942 },

            cycleXHub1: { lat: 23.764582527423773, lng: 90.42913999532198 },
            cycleXHub2: { lat: 23.75491137184827, lng: 90.41557908203598 },
            cycleXHub3: { lat: 23.77023019851235, lng: 90.40962595691866 },

            id: '3a17f42a4efce004'
        }
    },
    methods: {
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.currentUserLocation.lat = position.coords.latitude;
                        this.currentUserLocation.lng = position.coords.longitude;
                    },
                    error => {
                        console.log(error.message);
                    },
                )
            }
        },
        async OnInit(promise) {
            try {
                const { capabilities } = await promise

                // successfully initialized
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = 'user denied camera access permisson';
                } else if (error.name === 'NotFoundError') {
                    this.error = 'no suitable camera device installed';
                } else if (error.name === 'NotSupportedError') {
                    this.error = 'page is not served over HTTPS (or localhost)';
                } else if (error.name === 'NotReadableError') {
                    this.error = 'maybe camera is already in use';
                } else if (error.name === 'OverconstrainedError') {
                    this.error = 'did you requested the front camera although there is none?';
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = 'browser seems to be lacking features';
                }
            }
            finally {
                // hide loading indicator
            }
        },
        onDecode(decodedString) {
            this.decodedString = decodedString;
        },
        getQRCode() {
            this.isVisible = true;
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

.QR-code-reader {
    position: absolute;
    bottom: 20%;
    left: 10%;
}
</style>