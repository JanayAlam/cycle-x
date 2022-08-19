<template>
    <form @submit.prevent="submitHandler">
        <legend class="legend mb-5">
            <font-awesome-icon icon="fa-solid fa-at" /> Update User Information
        </legend>
        <div class="row">
            <div class="col">
                <div class="display-email mb-2 d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                    <span class="email ms-2">{{ user.email }}</span>
                </div>
                <input
                    type="email"
                    placeholder="New email address"
                    class="form-control"
                    :class="{ 'is-invalid': v$.email.$error }"
                    v-model="data.email"
                />
                <div class="invalid-feedback" v-if="v$.email.$error">
                    <div
                        v-for="error in v$.email.$errors"
                        :key="error.$message"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="display-email mb-2 d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-hashtag" />
                    <span class="email ms-2">{{ user.nid }}</span>
                </div>
                <input
                    type="text"
                    placeholder="New national identity card number"
                    class="form-control"
                    :class="{ 'is-invalid': v$.nid.$error }"
                    v-model="data.nid"
                />
                <div class="invalid-feedback" v-if="v$.nid.$error">
                    <div v-for="error in v$.nid.$errors" :key="error.$message">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
        </div>
        <button
            v-if="!isLoading"
            class="btn btn-sm px-3 mt-2 btn-success"
            type="submit"
        >
            <font-awesome-icon icon="fa-solid fa-check" />
            <span class="ms-2">Save User</span>
        </button>
        <button v-else class="btn btn-sm px-3 mt-2 btn-success" disabled>
            <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span class="ms-2">Processing...</span>
        </button>
    </form>
</template>

<script>
export default {
    name: 'UserInformationForm',
    props: {
        submitHandler: Function,
        user: Object,
        v$: Object,
        data: Object,
        isLoading: Boolean,
    },
};
</script>

<style scoped>
.display-email {
    font-size: 1.2rem;
}

.email {
    font-weight: bold;
}
</style>
