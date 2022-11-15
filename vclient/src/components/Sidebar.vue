<script setup>
import Search from './Search.vue'
import Home from './Home.vue'
</script>

<template>
    <container className="sidebar-cont">
        <Search className="search-bar" />
        <Home @clicked="onClickButton" />
    </container>
</template>

<script>
export default {
    methods: {
        onClickButton(num) {
            console.log("NUM IS: " + num)
            this.$emit('click2', num);
        }
    },
}
</script>

<style scoped>

* {
}
.text{
    font-size: 10rem;
}

.search-bar {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 2vh;
    margin-bottom: 3vh;
}

.sidebar-cont {
    background-color: maroon;
    display: flex;
    justify-content: center;
    width: 100%;
}

</style>