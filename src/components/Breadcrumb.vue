<template>
  <span>
    <router-link :to= "{name: route.name, params: {id: $route.params.id}}">
      {{route.title}}
    </router-link>
  </span>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['route']
}
</script>
