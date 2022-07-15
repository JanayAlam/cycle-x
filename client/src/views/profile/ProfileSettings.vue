<template>
    <div class="container">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <SettingsSidebar active="profile-settings" />
            </div>
            <div class="col-md-9 col-sm-8">
                <div v-if="isLoading">
                    <div class="card" aria-hidden="true">
                        <div class="card-body">
                            <h5 class="card-title placeholder-glow">
                                <span class="placeholder col-6"></span>
                            </h5>
                            <p class="card-text placeholder-glow">
                                <span class="placeholder col-7"></span>
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-4"></span>
                                <span class="placeholder col-6"></span>
                                <span class="placeholder col-8"></span>
                            </p>
                            <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder placeholder-glow col-6"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SettingsSidebar from '@/components/sidebars/SettingsSidebar.vue';
import { reactive } from 'vue';

export default {
    name: 'ProfileSettings',
    components: { SettingsSidebar },
    setup() {
        document.title = 'Settings';
        const state = reactive({
            isLoading: true,
        });

        return { ...state };
    },
};
</script>

<style scoped>
</style>
