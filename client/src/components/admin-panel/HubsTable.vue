<template>
    <div>
        <div class="w-100">
            <button class="btn btn-sm btn-success" @click="modalToggler">
                <font-awesome-icon icon="fa-solid fa-plus" /> Create a new hub
            </button>
        </div>
        <Table
            class="mt-2"
            :dataHeaders="dataHeaders"
            :data="data"
            :withAction="withAction"
            :editHandler="editHandler"
            :deleteHandler="deleteHandler"
            :modalToggler="modalToggler"
        />
        
    </div>
</template>

<script>
import Table from '@/components/table/Table.vue';

export default {
    name: 'HubsTable',
    props: {
        data: Array,
        info: Object,
        createHandler: Function,
        editHandler: Function,
        deleteHandler: Function,
        modalToggler: Function,
    },
    components: { Table },
    setup() {
        const dataHeaders = ['ID', 'Name', 'Latitude', 'Longitude'];
        return {
            dataHeaders,
            withAction: true,
        };
    },
};
</script>

<style scoped></style>
