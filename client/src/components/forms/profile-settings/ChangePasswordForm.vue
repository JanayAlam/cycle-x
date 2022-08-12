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
                    required
                    class="form-control"
                    :class="{ 'is-invalid': v$.oldPassword.$error }"
                    placeholder="Enter your old password"
                    v-model="data.oldPassword"
                />
                <div class="invalid-feedback" v-if="v$.oldPassword.$error">
                    <div
                        v-for="error in v$.oldPassword.$errors"
                        :key="error.$message"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="newPassword" class="mb-1">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': v$.newPassword.$error }"
                    placeholder="Enter the new password"
                    v-model="data.newPassword"
                />
                <div class="invalid-feedback" v-if="v$.newPassword.$error">
                    <div
                        v-for="error in v$.newPassword.$errors"
                        :key="error.$message"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="form-group mb-2">
                <label for="confirmPassword" class="mb-1">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    required
                    class="form-control"
                    :class="{ 'is-invalid': v$.confirmPassword.$error }"
                    placeholder="Retype the new password"
                    v-model="data.confirmPassword"
                />
                <div class="invalid-feedback" v-if="v$.confirmPassword.$error">
                    <div
                        v-for="error in v$.confirmPassword.$errors"
                        :key="error.$message"
                    >
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <button v-if="!isLoading" class="btn btn-sm px-3 btn-success" type="submit">
                <font-awesome-icon icon="fa-solid fa-arrow-up" />
                <span class="ms-2">Update Password</span>
            </button>
            <button v-else class="btn btn-sm px-3 btn-success">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="ms-2">Processing...</span>
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ChangePasswordForm',
    props: {
        data: Object,
        isLoading: Boolean,
        submitHandler: Function,
        v$: Object,
    },
};
</script>

<style></style>
