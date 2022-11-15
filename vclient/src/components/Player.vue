<template>
  <div className="video-container">
    <video id="videoplayer" className="video-player" controls crossOrigin autoPlay >
        <source v-bind:src="'http://localhost:4000/video/'+showid" />
    </video>
  </div>
</template>

<script>

    export default {
    name: 'Player',
    props: ['showid'],
    data () {
        return {
        }
    },
}
</script>

<style>

.video-container {
    object-fit: contain;
    position: absolute;
    background-color: black;
    display: flex;
    height: 97vh;
    max-width: 100%;
    justify-content: center;
}

.video-player {
    display: flex;
    max-width: 100%;
}

</style>