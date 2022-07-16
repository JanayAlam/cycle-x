<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="profile-settings" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="card card-body c-card" aria-hidden="true">
                    <profile-details-form :profile="profile" :submitHandler="submitHandler" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileDetailsForm from '@/components/forms/profile-settings/ProfileDetailsForm.vue';
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';

export default {
    name: 'ProfileSettings',
    components: { SettingsSidebar, ProfileDetailsForm },
    setup() {
        document.title = 'Settings';
        const store = useStore();

        const profile = computed(() => store.getters.getProfile);

        const submitHandler = async () => {
            try {
                await store.dispatch('changeProfileDetails', {
                    firstName: profile.value.firstName,
                    lastName: profile.value.lastName,
                    dob: profile.value.dob,
                });
                store.dispatch('pushNotification', { type: 'success', msg: 'Profile details updated' });
            } catch (e) {
                store.dispatch('pushNotification', { type: 'danger', msg: e.message });
            }

        };

        return { profile, submitHandler };
    },
};
</script>

<style scoped>
</style>
