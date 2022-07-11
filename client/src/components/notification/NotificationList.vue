<template>
    <div class="notification-list bottom-0 start-50 translate-middle-x">
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
}
</style>
