<template>
    <div class="container a-dashboard">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <admin-sidebar active="admin-hubs" />
            </div>
            <div class="a-dashboard-main col-md-9 col-sm-8">
                <hubs-table
                    :data="data"
                    :info="state.info"
                    :modalToggler="modalToggler"
                    :createHandler="createHandler"
                    :editHandler="editHandler"
                    :deleteHandler="deleteHandler"
                />
            </div>
            <modal
                header="Create hub"
                :toggler="modalToggler"
                :modalActive="state.modalActive"
            >
                <form @submit.prevent="createHandler">
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
                        <label for="lat" class="form-label mb-1">Latitude</label>
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
                        <label for="log" class="form-label mb-1">Longitude</label>
                        <input
                            v-model="state.info.log"
                            type="text"
                            class="form-control"
                            id="log"
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
                    <button class="btn btn-sm btn-success" type="submit">
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

export default {
    name: 'Hubs',
    components: { AdminSidebar, HubsTable, Modal },
    setup() {
        document.title = 'All hubs';

        const data = [
            {
                id: '507f1f77bcf86cd799439011',
                name: 'Bashundhara',
                longitude: 65.96,
                latitude: 65.96,
            },
            {
                id: '507f1f77bcf86cd799439013',
                name: 'Banani',
                longitude: 12.34,
                latitude: 46.57,
            },
            {
                id: '507f1f77bcf86cd799439014',
                name: 'Gulshan',
                longitude: 96.16,
                latitude: 699.12,
            },
            {
                id: '507f1f77bcf86cd799439012',
                name: 'Cumilla',
                longitude: 458.14,
                latitude: 89.78,
            },
        ];

        const state = reactive({
            modalActive: false,
            isModalBtnLoading: false,
            info: {
                name: '',
                log: '',
                lat: '',
            },
        });

        const modalToggler = () => {
            state.modalActive = !state.modalActive;
        };

        const createHandler = () => {
            console.log();
        };

        const editHandler = (id) => {
            console.log(id);
        };

        const deleteHandler = (id) => {
            console.log(id);
        };

        return {
            data,
            state,
            withAction: true,
            createHandler,
            editHandler,
            deleteHandler,
            modalToggler,
        };
    },
};
</script>

<style scoped></style>
