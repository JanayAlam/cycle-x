<template>
    <div class="container a-dashboard">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <admin-sidebar active="admin-hubs" />
            </div>
            <div class="a-dashboard-main col-md-9 col-sm-8">
                <div v-if="state.data.hubs === null">Loading...</div>
                <hubs-table
                    v-else
                    :data="state.data.hubs"
                    :info="state.info"
                    :modalToggler="modalToggler"
                    :createHandler="createHandler"
                    :editSelector="editSelector"
                    :deleteHandler="deleteHandler"
                />
            </div>
            <modal
                header="Create hub"
                :toggler="modalToggler"
                :modalActive="state.modalActive"
            >
                <form @submit.prevent="submitHandler">
                    <div class="mb-2">
                        <label for="name" class="form-label mb-1">Name</label>
                        <input
                            v-model="state.info.name"
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="Hub name"
                        />
                        <!-- <input
                        v-model="info.name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Hub name"
                        :class="{ 'is-invalid': v$.name.$error }"
                    />
                    <div class="invalid-feedback" v-if="v$.name.$error">
                        <div
                            v-for="error in v$.name.$errors"
                            :key="error.$message"
                        >
                            {{ error.$message }}
                        </div>
                    </div> -->
                    </div>
                    <div class="mb-2">
                        <label for="lat" class="form-label mb-1"
                            >Latitude</label
                        >
                        <input
                            v-model="state.info.lat"
                            type="text"
                            class="form-control"
                            id="lat"
                            placeholder="Latitude of the location"
                        />
                        <!-- <input
                        v-model="info.name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Hub name"
                        :class="{ 'is-invalid': v$.name.$error }"
                    />
                    <div class="invalid-feedback" v-if="v$.name.$error">
                        <div
                            v-for="error in v$.name.$errors"
                            :key="error.$message"
                        >
                            {{ error.$message }}
                        </div>
                    </div> -->
                    </div>
                    <div class="mb-2">
                        <label for="lng" class="form-label mb-1"
                            >Longitude</label
                        >
                        <input
                            v-model="state.info.lng"
                            type="text"
                            class="form-control"
                            id="lng"
                            placeholder="Longitude of the location"
                        />
                        <!-- <input
                        v-model="info.name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Hub name"
                        :class="{ 'is-invalid': v$.name.$error }"
                    />
                    <div class="invalid-feedback" v-if="v$.name.$error">
                        <div
                            v-for="error in v$.name.$errors"
                            :key="error.$message"
                        >
                            {{ error.$message }}
                        </div>
                    </div> -->
                    </div>
                    <!-- <button
                    v-if="state.isModalBtnLoading"
                    class="btn btn-sm btn-success"
                    disabled
                    type="submit"
                >
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Creating...
                </button> -->
                    <button
                        v-if="state.modalFor === 'edit'"
                        class="btn btn-sm btn-success"
                        type="submit"
                    >
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Edit
                    </button>
                    <button v-else class="btn btn-sm btn-success" type="submit">
                        <font-awesome-icon icon="fa-solid fa-plus" />
                        Create
                    </button>
                </form>
            </modal>
        </div>
    </div>
</template>

<script>
import AdminSidebar from '@/components/sidebars/AdminSidebar.vue';
import HubsTable from '@/components/admin-panel/HubsTable.vue';
import { reactive } from 'vue';
import Modal from '@/components/modal/Modal.vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    name: 'Hubs',
    components: { AdminSidebar, HubsTable, Modal },
    setup() {
        document.title = 'All hubs';
        const store = useStore();
        const state = reactive({
            modalActive: false,
            modalFor: 'create',
            isModalBtnLoading: false,
            info: {
                name: '',
                lng: '',
                lat: '',
            },
            data: {
                hubs: null,
            },
        });

        const modalForSelector = (x) => {
            state.modalFor = x;
        };

        const getAllHubs = () => {
            axios
                .get(`/hubs`)
                .then((res) => {
                    state.data.hubs = res.data.map((hub) => {
                        return {
                            id: hub.id,
                            name: hub.name,
                            longitude: hub.longitude,
                            latitude: hub.longitude,
                        };
                    });
                })
                .catch((error) => {
                    if (error.response) {
                        throw error.response.data;
                    }
                    throw error;
                });
        };

        getAllHubs();

        const modalToggler = () => {
            if (state.modalFor == 'edit') {
                state.info = {
                    name: '',
                    lng: '',
                    lat: '',
                };
            }
            state.modalFor = 'create';
            state.modalActive = !state.modalActive;
        };

        const createHandler = () => {
            const data = {
                ...state.info,
            };
            axios
                .post(`/hubs`, data)
                .then((res) => {
                    state.data.hubs.push({
                        id: res.data.id,
                        name: res.data.name,
                        longitude: res.data.longitude,
                        latitude: res.data.latitude,
                    });
                    modalToggler();
                    state.info = {
                        name: '',
                        lng: '',
                        lat: '',
                    };
                    store.dispatch('pushNotification', {
                        type: 'success',
                        msg: 'Hub added successfully',
                    });
                })
                .catch((error) => {
                    store.dispatch('pushNotification', {
                        type: 'danger',
                        msg: error.message,
                    });
                });
        };

        const editSelector = (id) => {
            const hub = state.data.hubs.filter((h) => h.id === id)[0];
            state.info.id = hub.id;
            state.info.name = hub.name;
            state.info.lng = hub.longitude;
            state.info.lat = hub.latitude;
            modalToggler();
            modalForSelector('edit');
        };

        const editHandler = (id) => {
            axios
                .get(`/hubs/{id}`, data)
                .then((res) => {
                    state.data.hubs.push({
                        id: res.data.id,
                        name: res.data.name,
                        longitude: res.data.longitude,
                        latitude: res.data.latitude,
                    });
                    modalToggler();
                    store.dispatch('pushNotification', {
                        type: 'success',
                        msg: 'Hub edited successfully',
                    });
                })
                .catch((error) => {
                    store.dispatch('pushNotification', {
                        type: 'danger',
                        msg: error.message,
                    });
                });
        };

        const deleteHandler = (id) => {
            console.log(id);
        };

        const submitHandler = () => {
            if (state.modalFor === 'edit') {
                editHandler();
            } else {
                createHandler();
            }
        };

        return {
            state,
            withAction: true,
            createHandler,
            editSelector,
            editHandler,
            deleteHandler,
            modalToggler,
            submitHandler,
        };
    },
};
</script>

<style scoped></style>
