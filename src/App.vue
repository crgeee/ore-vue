<template>
  <div id="app">
    <div class="container mb-3">
      <NavHeader/>
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
    <AppModal/>
    <Notify/>
  </div>
</template>

<script>
import AppModal from '@/components/AppModal'
import config from './appSettings.config.js'
import NavHeader from '@/components/NavHeader'
import Notify from '@/components/Notify'

export default {
  name: 'App',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: config.appName,
    // all titles will be injected into this template
    titleTemplate: '%s | ' + config.appName
  },
  components: {
    AppModal,
    NavHeader,
    Notify
  }
}
</script>

<style>
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y:scroll;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .1s;
}
.fade-enter-active {
  transition-delay: .1s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.noselect {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
</style>
