<template>
    <div>
        <h1 class="legend mb-5">
            <font-awesome-icon icon="fa-solid fa-key" /> Change Password
        </h1>
        <form @submit.prevent="submitHandler">
            <div class="form-group mb-2">
                <label for="oldPassword" class="mb-1">Old Password</label>
                <input
                    type="password"
                    id="oldPassword"
                    class="form-control"
                    placeholder="Enter your old password"
                    v-model="data.oldPassword"
                />
            </div>
            <div class="form-group mb-2">
                <label for="newPassword" class="mb-1">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    class="form-control"
                    placeholder="Enter the new password"
                    v-model="data.newPassword"
                />
            </div>
            <div class="form-group mb-2">
                <label for="confirmPassword" class="mb-1"
                    >Confirm Password</label
                >
                <input
                    type="password"
                    id="confirmPassword"
                    class="form-control"
                    placeholder="Retype the new password"
                    v-model="data.confirmPassword"
                />
            </div>
            <button class="btn btn-sm px-3 btn-success">
                <font-awesome-icon icon="fa-solid fa-floppy-disk" />
                <span class="ms-2">Update Password</span>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ChangePasswordForm',
    props: {
        data: Object,
        submitHandler: Function,
        v$: Object,
    },
};
</script>

<style></style>
