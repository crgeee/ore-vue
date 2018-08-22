<template>
  <div class="row">
    <div class="col">
      <div class="jumbotron text-center">
        <h1>{{ pageTitle }}</h1>
        <p>Please try again.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: 'Not Found'
  },
  data () {
    return {
      pageTitle: 'Page Not Found!'
    }
  }
}
</script>

<style scoped>
</style>
