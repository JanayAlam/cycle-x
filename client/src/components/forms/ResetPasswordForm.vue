<template>
    <form @submit.prevent="submitHandler">
        <div class="form-group">
            <label for="password">Password</label>
            <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.password.$error }"
                placeholder="Enter a strong password"
                aria-label="password"
                id="password"
                v-model="data.password"
            />
            <div class="invalid-feedback" v-if="v$.password.$error">
                <div v-for="error in v$.password.$errors" :key="error.$message">
                    {{ error.$message }}
                </div>
            </div>
        </div>
        <div class="form-group mt-2">
            <label for="c-password">Confirm password</label>
            <input
                type="password"
                class="form-control"
                :class="{ 'is-invalid': v$.confirmPassword.$error }"
                placeholder="Retype password"
                aria-label="c-password"
                id="c-password"
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
        <button
            v-if="isLoading"
            class="mt-2 btn btn-sm btn-success"
            disabled
            type="submit"
        >
            <span
                class="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
            ></span>
            Processing....
        </button>
        <button v-else class="mt-2 btn btn-sm btn-success" type="submit">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" /> Reset Password
        </button>
    </form>
</template>

<script>
export default {
    props: {
        data: Object,
        v$: Object,
        isLoading: Boolean,
        submitHandler: Function,
    },
};
</script>

<style scoped></style>
