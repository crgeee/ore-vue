<template>
  <div>
    <a :href="link" :class="cssClasses">{{ text | capitalizeStr }}
      <font-awesome-icon :icon="icon" />
    </a>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle'

export default {
  name: 'PillLabel',
  props: ['text', 'link', 'bgClass'],
  computed: {
    icon () {
      return faTimesCircle
    },
    cssClasses () {
      let mainCss = 'badge'
      if (this.bgClass && this.bgClass.length > 0) {
        mainCss = mainCss + ' ' + this.bgClass
      } else {
        mainCss = mainCss + ' ' + 'badge-secondary'
      }
      return mainCss
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
