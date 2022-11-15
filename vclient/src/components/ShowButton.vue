<template>
  <div className="button">

  </div>
</template>

<script>
export default {
    name: 'ShowButton',
    props: ['showid'],
    data () {
        return {
        }
    },
    methods: {
        onClickButton (event) {
            this.$emit('clicked', showid);
        }
    }

}
</script>

<style scoped>

* {
    color: red;
}

</style>