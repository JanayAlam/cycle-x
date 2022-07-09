<template>
    <div class="not-found-body">
        <h1>404</h1>
        <h4>Page Not Found</h4>
        <p>This page no longer exists or was moved to another location.</p>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
}
</script>

<style scoped>
.not-found-body {
    text-align: center;
    font-size: 1.2rem;
    font-family: 'Albert Sans', sans-serif;
}

.not-found-body h1 {
    font-size: 6rem;
    font-weight: 900;
    color: #D63329;
    margin-bottom: 0;
}

.not-found-body h4 {
    margin-top: 0;
    font-size: 1.5rem;
}
</style>
