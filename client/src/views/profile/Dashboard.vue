<template>
    <div>
        <div class="p-5 gradient-custom-mainbackground" style="height: 400px;">
            <div class="row">
                <!--Profile Picture-->
                <div class="col-md-2 col-sm-2">
                    <div class="vstack gap-3 m-2 d-inline-flex text-white">
                        <img class="rounded-circle" :src="profile.profilePhoto" alt="Profile Photo" height="150"
                            width="150" />
                        <h1 class="display-3 text-center "> {{ profile.firstName }} </h1>
                    </div>
                </div>

                <!--User Ranking-->
                <div class="col-md-4"></div>

                <!--Account Condition-->
                <div class="col-md-2"></div>

                <!--Card Type-->
                <div class="col-md-4 col-sm-3">
                    <div class="vstack rounded gradient-custom">
                        <label class="m-2 text-center text-light"> Card Type </label>

                        <div class="hstack row">
                            <img class="col-md-5 m-2" src="../../../../public/default/card.png" height="150"
                                width="200" />
                            <label class="col-md-2 ms-2 text-light"> Balance </label>
                            <div class="col-md-2 border bg-light">
                                <label>1250</label>
                            </div>
                        </div>
                        <div class="hstack ms-5 ps-5">
                            <label class="ms-5 ps-2 text-white"> Add Money: </label>
                            <div class="ms-5">
                                <button class="btn btn-link">
                                    <img src="../../../../public/default/bkash-logo.png" height="50" width="50" />
                                </button>
                                <button class="btn btn-link m-2">
                                    <img src="../../../../public/default/nagad-logo.png" height="50" width="50" />
                                </button>
                                <button class="btn btn-link m-2">
                                    <img src="../../../../public/default/rocket-logo.png" height="50" width="50" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Offer and Promotions-->
        <div class="row">
            <div class="col-md-4 mt-5 ms-4 rounded border border-4 border-dark">
                <ul>
                    <p class="h4 text-center text-white bg-dark">Offers and Promotion</p>
                    <li>
                        <p class="h5 text-center">!!! Ride & Traverse with exotic "cycle-X"!!!</p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-link"> CLICK TO SHOW MORE </button>
                        </div>
                    </li>
                    <li>
                        <hr class="dashed">
                    </li>
                    <li>
                        <p class="h5 text-center">*Collab with Coca-colaX this summer*</p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-link"> DETAILS </button>
                        </div>
                    </li>
                    <li>
                        <hr class="dashed">
                    </li>
                    <li>
                        <p class="h5 text-center">$ Get 50% taka off with first 3 rides $</p>
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-link"> DETAILS </button>
                        </div>
                    </li>
                    <p class="h5 text-center text-white bg-dark"> Previous ... Page1 ... Next(1, 2, 3)</p>
                </ul>
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
    background: linear-gradient(to right, rgb(56, 23, 90), rgba(4, 0, 252, 0.377));
}

.gradient-custom-mainbackground {
    /* fallback for old browsers */
    background: #6a11cb;

    /* Chrome 10-25, Safari 5.1-6 */
    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgb(234, 236, 238));

    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    background: linear-gradient(to right, rgba(0, 0, 0, 0.925), rgb(14, 223, 101), rgb(74, 196, 135), rgb(255, 255, 255));
}
</style>