<template>
    <div class="container a-dashboard">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <admin-sidebar active="admin-cycles" />
            </div>
            <div class="a-dashboard-main col-md-9 col-sm-8">
                <div v-if="state.data.cycles === null">Loading...</div>
                <cycles-table
                    v-else
                    :data="state.data.cycles"
                    :info="state.info"
                    :modalToggler="modalToggler"
                    :createHandler="createHandler"
                    :editSelector="editSelector"
                    :deleteHandler="deleteHandler"
                />
            </div>
            <modal
                header="Create cycle"
                :toggler="modalToggler"
                :modalActive="state.modalActive"
            >
                <form @submit.prevent="submitHandler">
                    <div class="mb-2">
                        <label for="cycleNumber" class="form-label mb-1"
                            >Cycle Number</label
                        >
                        <input
                            v-model="state.info.cycleNumber"
                            type="text"
                            class="form-control"
                            id="cycleNumber"
                            placeholder="Cycle number"
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
                        <label for="ridingStatus" class="form-label mb-1"
                            >Status</label
                        >
                        <input
                            v-model="state.info.ridingStatus"
                            type="text"
                            class="form-control"
                            id="ridingStatus"
                            placeholder="Status"
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
                        <label for="model" class="form-label mb-1">Model</label>
                        <input
                            v-model="state.info.model"
                            type="text"
                            class="form-control"
                            id="model"
                            placeholder="Cycle model"
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
                        <label for="hubId" class="form-label mb-1">Hub</label>
                        <input
                            v-model="state.info.hubId"
                            type="text"
                            class="form-control"
                            id="hubId"
                            placeholder="Hub"
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
                        <font-awesome-icon icon="fa-solid fa-check" />
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
import CyclesTable from '@/components/admin-panel/CyclesTable.vue';
import { reactive } from 'vue';
import Modal from '@/components/modal/Modal.vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
    name: 'Cycles',
    components: { AdminSidebar, CyclesTable, Modal },
    setup() {
        document.title = 'All cycles';
        const store = useStore();
        const state = reactive({
            modalActive: false,
            modalFor: 'create',
            isModalBtnLoading: false,
            info: {
                cycleNumber: '',
                ridingStatus: '',
                model: '',
                hubId: '',
            },
            data: {
                cycles: null,
            },
        });

        const modalForSelector = (x) => {
            state.modalFor = x;
        };

        const getAllCycles = () => {
            axios
                .get(`/cycles`)
                .then((res) => {
                    state.data.cycles = res.data.map((cycle) => {
                        return {
                            id: cycle.id,
                            cycleNumber: cycle.cycleNumber,
                            ridingStatus: cycle.ridingStatus,
                            model: cycle.model,
                            hubId: cycle.hub,
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

        getAllCycles();

        const modalToggler = () => {
            if (state.modalFor == 'edit') {
                state.info = {
                    cycleNumber: '',
                    ridingStatus: '',
                    model: '',
                    hubId: '',
                };
            }
            state.modalFor = 'create';
            state.modalActive = !state.modalActive;
        };

        const createHandler = () => {
            const data = {
                cycleNumber: state.info.cycleNumber,
                model: state.info.model,
                hubId: state.info.hubId,
            };
            axios
                .post(`/cycles`, data)
                .then((res) => {
                    state.data.cycles.push({
                        id: res.data.id,
                        cycleNumber: res.data.cycleNumber,
                        ridingStatus: res.data.ridingStatus,
                        model: res.data.model,
                        hubId: res.data.hub,
                    });
                    modalToggler();
                    state.info = {
                        id: '',
                        cycleNumber: '',
                        model: '',
                        ridingStatus: '',
                        hubId: '',
                    };
                    store.dispatch('pushNotification', {
                        type: 'success',
                        msg: 'Cycle added successfully',
                    });
                })
                .catch((error) => {
                    store.dispatch('pushNotification', {
                        type: 'danger',
                        msg: error.response.message
                            ? error.response
                            : error.message,
                    });
                });
        };

        const editSelector = (id) => {
            const cycle = state.data.cycles.filter((c) => c.id === id)[0];
            state.info.id = cycle.id;
            state.info.cycleNumber = cycle.cycleNumber;
            state.info.ridingStatus = cycle.ridingStatus;
            state.info.model = cycle.model;
            state.info.hubId = cycle.hubId;
            modalToggler();
            modalForSelector('edit');
        };

        const editHandler = () => {
            axios
                .patch(`/cycles/${state.info.id}`, {
                    cycleNumber: state.info.cycleNumber,
                    ridingStatus: state.info.ridingStatus,
                    model: state.info.model,
                    hubId: state.info.hubId,
                })
                .then((res) => {
                    const cycle = state.data.cycles.filter(
                        (c) => c.id === state.info.id
                    )[0];
                    cycle.id = res.data.id;
                    cycle.cycleNumber = res.data.cycleNumber;
                    cycle.ridingStatus = res.data.ridingStatus;
                    cycle.model = res.data.model;
                    cycle.hubId = res.data.hub;
                    modalToggler();
                    store.dispatch('pushNotification', {
                        type: 'success',
                        msg: 'Cycle edited successfully',
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
            axios
                .delete(`/cycles/${id}`)
                .then((res) => {
                    state.data.cycles = state.data.cycles.filter((cycle) => {
                        if (cycle.id !== id) {
                            return true;
                        }
                    });
                    store.dispatch('pushNotification', {
                        type: 'success',
                        msg: 'Cycle deleted successfully',
                    });
                })
                .catch((error) => {
                    console.log(error.response);
                    store.dispatch('pushNotification', {
                        type: 'danger',
                        msg: error.response.message
                            ? error.response
                            : error.message,
                    });
                });
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
