<template>
    <div>
        <h1 class="legend mb-5">
            <font-awesome-icon icon="fa-solid fa-user-gear" /> Profile Details
        </h1>
        <div class="row">
            <div class="col">
                <form @submit.prevent="submitHandler">
                    <div class="form-group mb-2">
                        <label for="firstName" class="mb-1">First name</label>
                        <input
                            type="text"
                            id="firstName"
                            class="form-control"
                            :class="{ 'is-invalid': v$.firstName.$error }"
                            placeholder="Enter first name"
                            v-model="profile.firstName"
                        />
                        <div
                            class="invalid-feedback"
                            v-if="v$.firstName.$error"
                        >
                            <div
                                v-for="error in v$.firstName.$errors"
                                :key="error.$message"
                            >
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="lastName" class="mb-1">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            class="form-control"
                            :class="{ 'is-invalid': v$.lastName.$error }"
                            placeholder="Enter last name"
                            v-model="profile.lastName"
                        />
                        <div class="invalid-feedback" v-if="v$.lastName.$error">
                            <div
                                v-for="error in v$.lastName.$errors"
                                :key="error.$message"
                            >
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>
                    <div class="form-group mb-2">
                        <label for="dob" class="mb-1">Date of birth</label>
                        <input
                            type="date"
                            id="dob"
                            class="form-control"
                            :class="{ 'is-invalid': v$.dob.$error }"
                            placeholder="yyyy-MM-dd"
                            v-model="profile.dob"
                        />
                        <div class="invalid-feedback" v-if="v$.dob.$error">
                            <div
                                v-for="error in v$.dob.$errors"
                                :key="error.$message"
                            >
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>
                    <button
                        v-if="!isLoading"
                        class="btn btn-sm px-3 btn-success"
                        type="submit"
                    >
                        <font-awesome-icon icon="fa-solid fa-check" />
                        <span class="ms-2">Save Profile</span>
                    </button>
                    <button v-else class="btn btn-sm px-3 btn-success" disabled>
                        <div
                            class="spinner-border spinner-border-sm"
                            role="status"
                        >
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <span class="ms-2">Processing...</span>
                    </button>
                </form>
            </div>
            <div class="col">
                <div
                    class="d-flex-row justify-content-center align-items-center"
                >
                    <div>
                        <div class="d-flex justify-content-center mb-2">
                            <img
                                class="rounded-circle"
                                :src="profile.profilePhoto"
                                alt="Profile Photo"
                                height="200"
                                width="200"
                            />
                        </div>
                        <input type="file" class="form-control" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProfileDetailsForm',
    props: {
        profile: Object,
        isLoading: Boolean,
        v$: Object,
        submitHandler: Function,
    },
};
</script>

<style scoped>
.button-edit-profile {
    border: 0;
    background-color: transparent;
    font-size: 1.2rem;
    margin-top: -250px;
    margin-left: -50px;
    cursor: pointer;
}
</style>
