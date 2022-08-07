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
                            v-model="profile.firstName"
                        />
                    </div>
                    <div class="form-group mb-2">
                        <label for="lastName" class="mb-1">Last name</label>
                        <input
                            type="text"
                            id="lastName"
                            class="form-control"
                            v-model="profile.lastName"
                        />
                    </div>
                    <div class="form-group mb-2">
                        <label for="dob" class="mb-1">Date of birth</label>
                        <input
                            type="date"
                            id="dob"
                            class="form-control"
                            placeholder="yyyy-MM-dd"
                            v-model="profile.dob"
                        />
                    </div>
                    <button class="btn btn-sm px-3 btn-success">
                        <font-awesome-icon icon="fa-solid fa-check" />
                        <span class="ms-2">Save Profile</span>
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
        submitHandler: Function,
    },
    setup(_props) {
        //
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
