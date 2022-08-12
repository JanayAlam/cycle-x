<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <settings-sidebar active="profile-settings" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div class="mt-4" aria-hidden="true">
                    <profile-details-form
                        :profile="state.data"
                        :isLoading="state.isLoading"
                        :submitHandler="submitHandler"
                        :v$="v$"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileDetailsForm from '@/components/forms/profile-settings/ProfileDetailsForm.vue';
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { minLength, maxLength, required } from '@vuelidate/validators';

export default {
    name: 'ProfileSettings',
    components: { SettingsSidebar, ProfileDetailsForm },
    setup() {
        document.title = 'Update profile details';
        const store = useStore();

        const profile = computed(() => store.getters.getProfile);

        const state = reactive({
            data: {
                firstName: profile.value.firstName,
                lastName: profile.value.lastName,
                dob: profile.value.dob,
                profilePhoto: profile.value.profilePhoto,
            },
            isLoading: false,
        });

        const rules = computed(() => {
            return {
                firstName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                },
                lastName: {
                    required,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                },
                dob: { required },
            };
        });
        const v$ = useVuelidate(rules, state.data);

        const submitHandler = async () => {
            state.isLoading = true;

            // validation
            v$.value.$validate();
            if (v$.value.$error) {
                state.isLoading = false;
                return;
            }

            try {
                await store.dispatch('changeProfileDetails', {
                    firstName: state.data.firstName,
                    lastName: state.data.lastName,
                    dob: state.data.dob,
                });
                store.dispatch('pushNotification', {
                    type: 'success',
                    msg: 'Profile details updated',
                });
            } catch (e) {
                store.dispatch('pushNotification', {
                    type: 'danger',
                    msg: e.message,
                });
            } finally {
                state.isLoading = false;
            }
        };

        return { state, submitHandler, v$ };
    },
};
</script>

<style scoped></style>
