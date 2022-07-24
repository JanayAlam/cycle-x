<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-2">
                <div class="vstack gap-3 m-2 d-inline-flex bg-dark bg-gradient text-white">
                    <img class="rounded-circle" :src="profile.profilePhoto" alt="Profile Photo" height="110" width="130" />
                    <label class="text-center"> {{ profile.firstName }} </label>
                </div>
            </div>
            <div class="col-md-6 col-sm-3">
                <div class="vstack border border-dark gradient-custom">
                    <label class="text-light"> Card Type </label>
                    
                    <div class="hstack">
                        <img class="m-3" src="../../../../public/default/card.png" height="100" width="200" />
                        <p class="font-weight-bold">Current Balance</p>
                        <div class="border bg-light">
                            <p class="mr-3">1250</p>
                        </div>
                    </div>
                    <div class="hstack">
                        <img class="m-3" src="../../../../public/default/bkash-logo.png" height="50" width="50" />
                        <img class="m-3" src="../../../../public/default/nagad-logo.png" height="60" width="70" />
                        <img class="m-3" src="../../../../public/default/rocket-logo.png" height="50" width="50" />    
                    </div>

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
.gradient-custom {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgb(234, 236, 238));

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, rgb(108, 15, 207), rgb(249, 250, 252));
}
</style>