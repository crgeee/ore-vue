<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <!-- <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="r in routes" :key="route.id">
          <Breadcrumb :route="r"></Breadcrumb>
        </li>
      </ol>
    </nav> -->
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'PageHeader',
  props: ['title', 'route'],
  components: {
    Breadcrumb
  },
  computed: {
    pageTitle () {
      let returnValue
      if (this.title) {
        returnValue = this.title
      } else {
        returnValue = this.route.meta.linkText
      }
      return returnValue
    }
  }
}
</script>
