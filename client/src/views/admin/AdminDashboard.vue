<template>
    <div class="container a-dashboard">
        <div class="row">
            <div class="sidebar col-md-3 col-sm-4">
                <admin-sidebar active="admin-dashboard" />
            </div>
            <div class="a-dashboard-main col-md-9 col-sm-8">
                <div class="fw-bold text-success mb-2 text-center" style="font-size: 1.5rem;">Number of users with ranks</div>
                <Bar
                    :chart-options="chartOptions"
                    :chart-data="chartData"
                    width="1000"
                    height="500"
                />
            </div>
        </div>
    </div>
</template>

<script>
import AdminSidebar from '@/components/sidebars/AdminSidebar.vue';
import { Bar } from 'vue-chartjs';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
);

export default {
    name: 'AdminDashboard',
    components: { AdminSidebar, Bar },
    setup() {
        document.title = 'Admin dashboard';
    },
    async created() {
        const response = await axios.get('/systems/get-status');
        this.chartData = response.data;
    },
    data() {
        return {
            chartData: {
                labels: ['BRONZE', 'SILVER', 'GOLD', 'ELITE'],
                datasets: [{ data: [0, 0, 0, 0] }],
            },
            chartOptions: {
                responsive: true,
            },
        };
    },
};
</script>

<style scoped></style>
