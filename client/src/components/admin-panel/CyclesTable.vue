<template>
    <div>
        <div class="w-100">
            <button class="btn btn-sm btn-success" @click="modalToggler">
                <font-awesome-icon icon="fa-solid fa-plus" /> Create a new cycle
            </button>
        </div>
        <Table
            class="mt-2"
            :dataHeaders="dataHeaders"
            :data="data"
            :withAction="withAction"
            :editSelector="editSelector"
            :deleteHandler="deleteHandler"
            :modalToggler="modalToggler"
        />
        
    </div>
</template>

<script>
import Table from '@/components/table/Table.vue';

export default {
    name: 'CyclesTable',
    props: {
        data: Array,
        info: Object,
        createHandler: Function,
        editSelector: Function,
        deleteHandler: Function,
        modalToggler: Function,
    },
    components: { Table },
    setup() {
        const dataHeaders = ['ID', 'Cycle Number', 'Status', 'Model', 'Hub ID'];
        return {
            dataHeaders,
            withAction: true,
        };
    },
};
</script>

<style scoped></style>
