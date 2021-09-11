<template>
<div>
    <img src='../assets/hearts.svg' />
    <h1>404</h1>
    <h3>Don't go breakin' my website</h3>
</div>
</template>

<script>
export default {
    name: 'PageMissing'
}
</script>

<style lang='scss' scoped>
div {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: purple;

    h1 {
        font-size: 4rem;
    }

    h3 {
        font-size: 2rem;
    }
}
</style>