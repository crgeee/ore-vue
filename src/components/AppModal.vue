
<template>
  <div class="ore-app-modal" @keydown.esc="hideModal">
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="ore-app-modal__overlay" v-if="visible"></div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div class="ore-app-modal__content" v-if="visible" @click.self="hideModal">
        <div class="ore-app-modal__innerContent">
          <component :is="component" :modalData="modalData"></component>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AppModal',
  data () {
    return {
      component: null
    }
  },
  computed: {
    ...mapState({
      modalComponent: 'modalComponent',
      modalData: 'modalData',
      visible: 'modalVisible'
    })
  },
  methods: {
    ...mapMutations(['hideModal'])
  },
  watch: {
    modalComponent (componentName) {
      if (!componentName) return
      Vue.component(componentName, () => import(`./modal/${componentName}`))
      this.component = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
.ore-app-modal {
  &__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    background: rgba(#222, 0.8);
  }
  &__content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 901;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__innerContent {
    padding: 2em;
    background: #fff;
    border-radius: 10px;
    max-width: 1000px;
    min-width: 100px;
  }
}
.animated {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
.fadeIn {
  animation-name: fadeIn;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
.fadeOut {
  animation-name: fadeOut;
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
.fadeInUp {
  animation-name: fadeInUp;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
}
.fadeOutDown {
  animation-name: fadeOutDown;
  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
  }
}
</style>
