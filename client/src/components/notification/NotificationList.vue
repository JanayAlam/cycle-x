<template>
    <div class="notification-list top-0 start-50 translate-middle-x">
        <notification v-for="notification in getNotifications" :key="notification.id" :notification="notification" />
    </div>
</template>

<script>
import Notification from '@/components/notification/Notification.vue';
import { mapGetters } from 'vuex';

export default {
    components: { Notification },
    computed: {
        ...mapGetters(['getNotifications']),
    }
}
</script>

<style scoped>
.notification-list {
    position: fixed;
    margin-top: 10px;
}
</style>
