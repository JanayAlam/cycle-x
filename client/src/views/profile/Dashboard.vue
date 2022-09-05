<template>
    <div>
        <div class="p-5 bg-success">
            <div class="row">
                <!--Profile Picture-->
                <div class="col-md-2 col-sm-2">
                    <div class="vstack gap-3 m-2 d-inline-flex text-white">
                        <img
                            class="rounded-circle"
                            :src="profile.profilePhoto"
                            alt="Profile Photo"
                            height="150"
                            width="150"
                        />
                        <h1 class="display-6 text-center">
                            {{ profile.firstName }} {{ profile.lastName }}
                        </h1>
                        <p>{{ profile.rank.rankName }}</p>
                    </div>
                </div>

                <!--User Ranking-->
                <div class="col-md-4"></div>

                <!--Account Condition-->
                <div class="col-md-2"></div>

                <!--Card Type-->
                <div class="col-md-4 col-sm-3">
                    <div class="card card-body">
                        <div>
                            <span class="text-center fw-bold">
                                Balance: {{ profile.account.balance }} Taka
                            </span>
                            <hr />
                            <form @submit.prevent="submitHandler">
                                <legend class="mb-2">Recharge</legend>
                                <select class="form-control mb-2">
                                    <option value="bkash">Bkash</option>
                                    <option value="nagad">Nagad</option>
                                    <option value="rocket">Rocket</option>
                                </select>
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Enter mobile number"
                                    v-model="state.number"
                                />
                                <input
                                    type="number"
                                    class="form-control mb-2"
                                    placeholder="Enter amount"
                                    v-model="state.amount"
                                />
                                <button
                                    v-if="!state.isLoading"
                                    class="btn btn-sm btn-success"
                                >
                                    Recharge
                                </button>
                                <button
                                    v-else
                                    class="btn btn-sm btn-success"
                                    disabled
                                >
                                    Processing...
                                </button>
                            </form>
                        </div>
                    </div>
                    <div class="mt-2 card card-body fw-bold">
                        <div v-if="!state.status">
                            <div class="text-primary">Riding now...</div>
                            <button
                                class="btn btn-sm btn-danger mt-2"
                                @click="stopRiding"
                            >
                                Stop Riding
                            </button>
                        </div>
                        <div v-else class="text-danger">Not riding!</div>
                    </div>
                </div>
            </div>
        </div>

        <!--Offer and Promotions-->
        <div class="row">
            <div class="col-md-4 mt-5 ms-4 rounded border border-4 border-dark">
                <ul>
                    <p class="h4 text-center text-white bg-dark">
                        Offers and Promotion
                    </p>
                    <li>
                        <p class="h5 text-center">
                            !!! Ride & Traverse with exotic "cycle-X"!!!
                        </p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-link">
                                CLICK TO SHOW MORE
                            </button>
                        </div>
                    </li>
                    <li>
                        <hr class="dashed" />
                    </li>
                    <li>
                        <p class="h5 text-center">
                            *Collab with Coca-colaX this summer*
                        </p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-link">DETAILS</button>
                        </div>
                    </li>
                    <li>
                        <hr class="dashed" />
                    </li>
                    <li>
                        <p class="h5 text-center">
                            $ Get 50% taka off with first 3 rides $
                        </p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-link">DETAILS</button>
                        </div>
                    </li>
                    <p class="h5 text-center text-white bg-dark">
                        Previous ... Page1 ... Next(1, 2, 3)
                    </p>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileDetailsForm from '@/components/forms/profile-settings/ProfileDetailsForm.vue';
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import axios from 'axios';
import { ref } from 'vue';

export default {
    name: 'Dashboard',
    components: { SettingsSidebar, ProfileDetailsForm },
    setup() {
        document.title = 'Dashboard';
        const store = useStore();
        const state = ref({
            isLoading: false,
            amount: 0,
            number: '',
            status: true,
        });

        (() => {
            axios
                .get('/systems/ride/get-status')
                .then((res) => res.data)
                .then((data) => {
                    state.value.status = data;
                })
                .catch((e) => {
                    console.log(e);
                });
        })();

        const profile = computed(() => store.getters.getProfile);

        const submitHandler = async () => {
            try {
                if (state.value.number.length < 10) {
                    throw new Error(
                        'Phone number must be at least 10 characters long'
                    );
                }
                if (state.value.amount === 0) {
                    throw new Error('Cannot add 0 credit');
                }
                await axios.post('/transactions', {
                    accountId: profile.value.account._id,
                    amount: state.value.amount,
                });
                store.dispatch('attempt', localStorage.getItem('token'));
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'Recharge successful',
                });
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            }
        };

        const stopRiding = async () => {
            try {
                const response = await axios.patch('/systems/finish-riding');
                store.dispatch('attempt', localStorage.getItem('token'));
                state.value.status = response.data.isFinished;
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'Finished riding',
                });
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            }
        };

        return { state, profile, submitHandler, stopRiding };
    },
};
</script>

<style scoped>
.gradient-custom {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(
        to right,
        rgba(106, 17, 203, 1),
        rgb(234, 236, 238)
    );

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(
        to right,
        rgb(56, 23, 90),
        rgba(4, 0, 252, 0.377)
    );
}

.gradient-custom-mainbackground {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(
        to right,
        rgba(106, 17, 203, 1),
        rgb(234, 236, 238)
    );

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.925),
        rgb(14, 223, 101),
        rgb(74, 196, 135),
        rgb(255, 255, 255)
    );
}
</style>
