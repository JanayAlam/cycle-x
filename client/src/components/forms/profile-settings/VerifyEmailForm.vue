<template>
    <form @submit.prevent="submitHandler">
        <legend class="legend mb-5 primary-clr">
            <font-awesome-icon icon="fa-solid fa-user-check" /> Verify Email Address
        </legend>
        <div class="display-email d-flex align-items-center">
            <font-awesome-icon icon="fa-solid fa-envelope" />
            <span class="email ms-2">{{ user.email }}</span>
            <sup>
                <router-link :to="{ name: 'change-user-info' }" class="primary-clr">edit</router-link>
            </sup>
        </div>
        <div v-if="user.isEmailVerified">
            <p class="emoji-text">Yeah! Already verified.</p>
        </div>
        <div v-else>
            <div class="d-flex">
                <input type="text" v-model="token" placeholder="Verification token" class="form-control" />
                <button class="btn btn-primary px-4 ms-2 d-flex align-items-center">
                    <span class="me-2">Verify</span>
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                </button>
            </div>
            <div v-if="isResentLoading" class="mt-2">
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                Processing
            </div>
            <button v-else class="resent-btn mt-2">Resent the verification token</button>
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
        isLoading: Boolean,
        isResentLoading: Boolean,
        token: String,
    },
}
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