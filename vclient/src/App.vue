<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Player from './components/Player.vue'
import Sidebar from './components/Sidebar.vue'

</script>

<template>
  <container className="main-cont">
    <container className="header-cont">
      <Header className="header"></Header>
    </container>
    <container className="content-cont">
      <container className="player-cont">
        <Player :showid="showid" />
      </container>
      <container className="sidebar-cont"   >
        <Sidebar className="sidebar" @click2="getShow" />
      </container>
    </container>
  </container>
</template>

<script lang="ts">
export default {
  name: "app",
  data () {
      return {
        isShowing: true,
        showid: 1,
      }
    },
  mounted () {
  },
  methods: {
    getShow(value) {
      console.log("Value is: " + value)
      this.showid = value;
      this.toggleSidebar();
      console.log("isShowing is: " + this.isShowing);
    },
    toggleSidebar() {
      if (this.isShowing) { this.isShowing = !this.isShowing}
    }
  },
}
</script>

<style scoped>

.player-cont {
  object-fit: scale-down;
  position: fixed;
  float: right;
  width: 80%;
}
.sidebar-cont {
  float: left;
  width: 20%;
}

</style>
