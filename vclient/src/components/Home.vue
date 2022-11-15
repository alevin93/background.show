<script setup lang="ts">
import Show from './Show.vue'
import ShowButton from './ShowButton.vue'

</script>

<template>
    <div className="main-cont">
    <ul :style="gridStyle" class="card-list">
        <li v-for="(videos, index) in videos" class="card-item" >   
            <div className="image-cont" v-on:click="onClickButton(videos.id)" >
                <Show :showid="videos.id" />
            </div>
        </li>
    </ul>
    </div>
</template>

<script lang="ts">

export default {
    name: 'Home',
    components: {
        Show
    },
    data () {
        return {
            videos: [],
        }
    },
    computed: {
        gridStyle() {
            return {
            }
        }
    },
    methods: {
        addCard() {
            this.cards.push('new-card')
        },
        onClickButton(num) {
            console.log("ID IS: " + num)
            this.$emit('clicked', num);
        }
    },
    mounted() {
        fetch('http://localhost:4000/videos')
            .then(res => res.json())
            .then(data => this.videos = data)
            .catch(err => console.log(err.message))
    }
}
</script>

<style scoped>

.main-cont {
    display: flex;
    justify-content: center;
}
.card-list {
    display: grid;
    width: 70%;
    max-width: 70%

}

.card-item {
}


ul {
    list-style: none;
    padding: 0;
}


</style>