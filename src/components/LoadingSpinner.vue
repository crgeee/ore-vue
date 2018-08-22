<template>
  <div v-if="isLoading" class="text-center">
    <font-awesome-icon :icon="icon" size="2x" spin />
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch'
import { mapState } from 'vuex'

export default {
  name: 'LoadingSpinner',
  computed: {
    ...mapState({
      isLoading: 'isLoading'
    }),
    icon () {
      return faCircleNotch
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
