<template>
    <div title="click to close" @click="handleClick" class="alert mb-1 d-flex align-items-center justify-content-center"
        :class="typeClass" role="alert">
        <div class="icon me-2">
            <font-awesome-icon icon="fa-solid fa-info" class="icon" />
        </div>
        <div class="msg mb-0 align-self-center">{{ notification.msg }}</div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapActions } from 'vuex';

export default {
    props: {
        notification: Object,
    },
    created() {
        this.timeout = setTimeout(() => {
            this.handleClick();
        }, 5000);
    },
    beforeUnmount() {
        clearTimeout(this.timeout);
    },
    computed: {
        typeClass() {
            const acceptableTypes = [
                'success', 'primary', 'secondary', 'info', 'danger', 'warning',
            ]
            if (!acceptableTypes.includes(this.notification.type)) {
                return 'alert-primary'
            }
            return `alert-${this.notification.type}`
        }
    },
    methods: {
        ...mapActions(['popNotification']),
        handleClick() {
            this.popNotification(this.notification.id);
        },
    },
    setup(_props) {
        const timeout = ref(null);

        return { timeout };
    },
}
</script>

<style scoped>
.icon {
    height: 1rem;
    width: 1rem;
}

.alert {
    border: 0;
    cursor: pointer;
    min-width: 350px;
}

.alert-primary {
    background-color: #072a53;
    color: #eeeeee;
}

.alert-secondary {
    background-color: #DFEDF4;
    color: #333333;
}

.alert-dark {
    background-color: #333333;
    color: #F2F2F2;
}

.alert-light {
    background-color: #EEEEEE;
    color: #333333;
}

.alert-danger {
    background-color: #D63329;
    color: #EEEEEE;
}

.alert-success {
    background-color: #a0ffc6;
    color: #10472d;
}
</style>
