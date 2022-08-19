<template>
    <form @submit.prevent="submitHandler">
        <legend class="legend mb-5">
            <font-awesome-icon icon="fa-solid fa-user-check" /> Verify Email
            Address
        </legend>
        <div class="display-email d-flex align-items-center">
            <font-awesome-icon icon="fa-solid fa-envelope" />
            <span class="email ms-2">{{ user.email }}</span>
            <sup>
                <router-link
                    :to="{ name: 'change-user-info' }"
                    class="text-dark"
                    ><font-awesome-icon icon="fa-solid fa-pencil" />
                    edit</router-link
                >
            </sup>
        </div>
        <div v-if="user.isEmailVerified">
            <p class="emoji-text text-success">
                <font-awesome-icon
                    icon="fa-solid fa-circle-check"
                    class="me-2"
                />Yeah! Already verified.
            </p>
        </div>
        <div v-else>
            <div class="d-flex">
                <input
                    type="text"
                    v-model="data.token"
                    placeholder="Verification token"
                    class="form-control"
                />
                <button
                    v-if="isVerifyButtonLoading"
                    disabled
                    style="min-width: 180px"
                    class="btn btn-success ms-2 d-flex align-items-center justify-content-center"
                >
                    <span
                        class="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                    ></span>
                    Processing...
                </button>
                <button
                    v-else
                    style="min-width: 180px"
                    class="btn btn-success ms-2 d-flex align-items-center justify-content-center"
                >
                    <span class="me-2">Verify</span>
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                </button>
            </div>
            <div v-if="isResentLoading" class="mt-2">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                Sending...
            </div>
            <button
                v-else
                class="resent-btn mt-2"
                @click.prevent="resentVerificationTokenHandler"
            >
                Resent the verification token
            </button>
        </div>
    </form>
</template>

<script>
export default {
    name: 'VerifyEmailForm',
    props: {
        submitHandler: Function,
        resentVerificationTokenHandler: Function,
        user: Object,
        isVerifyButtonLoading: Boolean,
        isResentLoading: Boolean,
        data: Object,
    },
};
</script>

<style scoped>
.display-email {
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.email {
    font-weight: bold;
}

a {
    font-size: 0.9rem;
    margin-left: 5px;
    text-decoration: none;
    font-weight: 300;
}

a:hover {
    text-decoration: underline;
}

.resent-btn {
    border: 0;
    background: transparent;
    margin: 5px 0;
}

.resent-btn:hover {
    text-decoration: underline;
}

.emoji-text {
    margin-top: 15px;
    font-size: 1rem;
}
</style>
