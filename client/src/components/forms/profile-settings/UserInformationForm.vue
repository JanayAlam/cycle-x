<template>
    <form @submit.prevent="submitHandler">
        <legend class="legend mb-5 primary-clr">
            <font-awesome-icon icon="fa-solid fa-at" /> Update User Information
        </legend>
        <div class="row">
            <div class="col">
                <div class="display-email mb-2 d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-envelope" />
                    <span class="email ms-2">{{ user.email }}</span>
                </div>
                <input type="email" placeholder="New email address" class="form-control" />
            </div>
            <div class="col">
                <div class="display-email mb-2 d-flex align-items-center">
                    <font-awesome-icon icon="fa-solid fa-hashtag" />
                    <span class="email ms-2">{{ user.nid }}</span>
                </div>
                <input type="text" placeholder="New national identity card number" class="form-control" />
            </div>
        </div>
        <button class="btn btn-sm px-3 mt-2 btn-primary">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />
            <span class="ms-2">Save User</span>
        </button>
    </form>
</template>

<script>
export default {
    name: 'UserInformationForm',
    props: {
        submitHandler: Function,
        user: Object,
        isLoading: Boolean,
    },
}
</script>

<style scoped>
.display-email {
    font-size: 1.2rem;
}

.email {
    font-weight: bold;
}
</style>
