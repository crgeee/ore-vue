<template>
  <div class="row">
    <div class="col">
      <div class="jumbotron">
        <h1>{{ pageTitle }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dash',
  metaInfo: {
    title: 'Dash'
  },
  data () {
    return {
      pageTitle: 'A2D Reporting Tool'
    }
  }
}
</script>

<style scoped>
</style>
