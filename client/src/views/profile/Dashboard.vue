<template>
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-2">
                <div class="vstack gap-3 m-2 d-inline-flex bg-dark bg-gradient text-white">
                    <img class="rounded-circle" :src="profile.profilePhoto" alt="Profile Photo" height="110"
                        width="130" />
                    <label class="text-center"> {{ profile.firstName }} </label>
                </div>
            </div>
            <div class="col-md-9 col-sm-3">
                <div class="vstack border border-dark bg-gradient text-dark">
                    <label class="text-center"> Card Type </label>
                    <img src="../../../../public/default/card.png" height="100" width="200" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileDetailsForm from "@/components/forms/profile-settings/ProfileDetailsForm.vue";
import SettingsSidebar from "@/components/sidebars/SettingsSidebar.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default
    {
        name: "Dashboard",
        components: { SettingsSidebar, ProfileDetailsForm },
        setup() {
            document.title = "Dashboard";
            const store = useStore();

            const profile = computed(() => store.getters.getProfile);

            const submitHandler = async () => {
                try {
                    await store.dispatch("changeProfileDetails",
                        {
                            firstName: profile.value.firstName,
                            lastName: profile.value.lastName,
                            dob: profile.value.dob,
                        });
                    store.dispatch("pushNotification",
                        {
                            type: "success",
                            msg: "Profile details updated",
                        });
                }
                catch (e) {
                    store.dispatch("pushNotification", { type: "danger", msg: e.message });
                }
            };

            return { profile, submitHandler };
        },
    };
</script>

<style scoped>
</style>