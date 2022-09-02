<template>
    <div v-if="isAuthenticated">
        <!--Google Map Implementation-->
        <div>
            <GMapMap
                :center="currentUserLocation"
                :zoom="17"
                map-type-id="terrain"
                style="width: 100%; height: 100vh"
            >
                <GMapCluster>
                    <GMapMarker
                        :key="id"
                        :position="currentUserLocation"
                        :clickable="true"
                        :draggable="true"
                    />
                    <GMapMarker
                        v-for="hub in hubs"
                        :key="hub.name"
                        :position="hub.loc"
                        :icon="hubIcon"
                        :clickable="true"
                        :draggable="false"
                    />
                </GMapCluster>
            </GMapMap>
        </div>
        <!--QR Code Reader Live Stream-->
        <div v-if="isQRStreamVisible" class="QR-code-reader-stream">
            <div class="text-end">
                <button @click="closeQRCodeScanner()" class="btn btn-link">
                    <img
                        src="../../../public/default/stop-button-icon.png"
                        height="30"
                        width="30"
                    />
                </button>
            </div>

            <p>{{ error }}</p>
            <p class="bg-white fs-3">{{ decodedString }}</p>
            <qrcode-stream @init="OnInit" @decode="onDecode"></qrcode-stream>
        </div>
        <!--Current Location & QR Code Scanner-->
        <div class="Location-QR-Scanner">
            <div class="vstack">
                <button class="btn btn-link" @click="openQRCodeScanner()">
                    <img
                        src="../../../public/default/scan-qr-code-icon.jpg"
                        height="100"
                        width="100"
                    />
                </button>
                <button class="btn btn-link" @click="getCurrentLocation()">
                    <img
                        src="../../../public/default/Location-Icon.png"
                        height="80"
                        width="80"
                    />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { QrcodeStream } from 'vue3-qrcode-reader';
import axios from 'axios';

export default {
    name: 'Home',
    components: { QrcodeStream },
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser', 'getProfile']),
    },
    created() {
        this.getAllHubs();
    },
    setup() {
        document.title = 'Cycle X';
    },
    data() {
        return {
            //QR Code Variables
            error: '',
            decodedString: '',
            isQRStreamVisible: false,

            //hubIcon: '../../../public/default/CycleX-Hub-Icon.png',
            hubIcon:
                'https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png',
            currentUserLocation: {
                lat: 23.76850367011616,
                lng: 90.42554965500942,
            },
            hubs: [],
        };
    },
    methods: {
        getCurrentLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        this.currentUserLocation.lat = position.coords.latitude;
                        this.currentUserLocation.lng =
                            position.coords.longitude;
                    },
                    (error) => {
                        console.log(error.message);
                    }
                );
            }
        },
        async OnInit(promise) {
            try {
                const { capabilities } = await promise;

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
                    this.error =
                        'did you requested the front camera although there is none?';
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = 'browser seems to be lacking features';
                }
                this.isQRStreamVisible = false;
            } finally {
                // hide loading indicator
            }
        },
        onDecode(decodedString) {
            this.decodedString = decodedString;
        },
        openQRCodeScanner() {
            this.isQRStreamVisible = true;
        },
        closeQRCodeScanner() {
            this.isQRStreamVisible = false;
        },
        parseJSON() {
            let cycle_id = JSON.parse(this.decodedString);
        },
        async getAllHubs() {
            const res = await axios.get('hubs/');
            this.hubs = res.data.map((h) => {
                return {
                    name: h.name,
                    loc: { lat: h.latitude, lng: h.longitude },
                };
            });
            console.log(this.hubs);
        },
    },
};
</script>

<style scoped>
.Location-QR-Scanner {
    position: absolute;
    bottom: 12%;
    right: 0%;
    font-size: large;
    background: transparent;
}

.QR-code-reader-stream {
    position: absolute;
    top: 15%;
    bottom: 20%;
    left: 20%;
}
</style>
