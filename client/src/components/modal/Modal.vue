<template>
    <div class="modal-outer" v-show="modalActive" @click.self="toggler">
        <div class="h-100 d-flex justify-content-center align-items-center">
            <div class="card card-body c-card c-modal">
                <div class="d-flex header">
                    <h1 class="header me-auto">{{ header || 'Modal' }}</h1>
                    <button @click.prevent="toggler" class="btn btn-sm btn-light text-danger fw-bold">
                        Close
                    </button>
                </div>
                <!-- modal content -->
                <div>
                    <div class="my-2">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Modal from '@/components/modal/Modal.vue';


export default {
    components: { Modal },
    props: {
        modalActive: Boolean,
        header: String,
        toggler: Function,
    },
}
</script>

<style scoped>
.modal-outer {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
}

.c-modal {
    padding: 10px 15px;
    min-width: 600px;
    max-width: 700px;
}

.header {
    font-size: 1.3rem;
    margin: 5px 0 10px;
}
</style>
