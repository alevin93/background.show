
<template>
  <div className="show-card" id='id'>
    <img v-bind:src="'http://localhost:4000/poster/'+showid" />
  </div>
</template>

<script lang="ts">

export default {
    name: 'Show',
    props: ['showid'],
    data () {
        return {
        }
    },
}
</script>

<style>

img {
    max-width: 100%;
    justify-content: center;
    border: solid 10px black;
    object-fit: fill;
}

</style>