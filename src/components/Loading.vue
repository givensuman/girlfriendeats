<template>

<div id='loading'>
    <img src='../assets/hearts.svg' />
    <h1>Looking around...</h1>
</div>

</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style lang='scss'>
#loading {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: relative;
    top: 20vh;
    margin: 0 auto;
    
    color: purple;
}
</style>