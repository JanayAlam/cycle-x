<template>
    <div>
        <form @submit.prevent="submitHandler" class="primary-clr">
            <legend class="legend">Verify Email Address</legend>
            <div class="display-email d-flex align-items-center primary-clr">
                <font-awesome-icon icon="fa-solid fa-at" />
                <span class="email primary-clr ms-2">{{ user.email }}</span>
                <sup>
                    <router-link to="#" class="primary-clr">edit</router-link>
                </sup>
            </div>
            <div v-if="!user.isEmailVerified">
                <div class="d-flex justify-content-center mt-2">
                    <font-awesome-icon icon="fa-solid fa-face-grin-beam" class="emoji primary-clr" />
                </div>
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
                <div v-if="isResentLoading" class="primary-clr mt-2">
                    <div class="spinner-border spinner-border-sm" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Processing
                </div>
                <button v-else class="resent-btn primary-clr mt-2">Resent the verification token</button>
            </div>
        </form>
    </div>
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

.emoji {
    font-size: 10rem;
}

.emoji-text {
    margin: 15px 0;
    font-size: 2rem;
    text-align: center;
}

</style>