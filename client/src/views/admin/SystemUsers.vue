<template>
    <div class="container a-dashboard">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <admin-sidebar active="system-users" />
            </div>
            <div class="a-dashboard-main col-md-9 col-sm-8">
                This is a main section
            </div>
        </div>
    </div>
</template>

<script>
import AdminSidebar from '@/components/sidebars/AdminSidebar.vue';

export default {
    name: 'SystemUsers',
    components: { AdminSidebar },
    setup() {
        document.title = 'System users';

        return {};
    },
};
</script>

<style scoped></style>