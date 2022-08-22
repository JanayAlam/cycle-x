<template>
    <table class="table">
        <thead>
            <tr>
                <th v-if="withAction" scope="col"></th>
                <th v-for="header in dataHeaders" :key="header" scope="col">
                    {{ header }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="hub in data" :key="hub.id">
                <th v-if="withAction" scope="row">
                    <button class="btn btn-sm btn-primary me-2" @click="editSelector(hub.id)">
                        <font-awesome-icon icon="fa-solid fa-pen" />
                    </button>
                    <button class="btn btn-sm btn-danger" @click="deleteHandler(hub.id)">
                        <font-awesome-icon icon="fa-solid fa-trash-can" />
                    </button>
                </th>
                <td v-for="body in Object.values(hub)" :key="body" scope="col">
                    {{ body }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: {
        dataHeaders: Array,
        data: Array,
        withAction: Boolean,
        editSelector: Function,
        deleteHandler: Function,
    },
};
</script>

<style scoped>
thead {
    background: #d7f3d775;
}
thead tr th {
    padding-top: 15px;
    padding-bottom: 15px;
    color: #09441c;
    border-bottom: 1px solid #09441c;
}
</style>
