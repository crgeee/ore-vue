<template>
  <div class="row">
    <div class="col">
      <b-navbar toggleable="md" type="dark" variant="dark" class="rounded mb-2 mt-2 noselect">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand :to="{ name: 'Dash' }" exact>A2D Reports</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item :to="{ name: 'Dash', params: {} }" exact>Dash</b-nav-item>
            <b-nav-item :to="{ name: 'Projects', params: {} }">Projects</b-nav-item>
            <b-nav-item :to="{ name: 'Milestones', params: {} }">Milestones</b-nav-item>
            <b-nav-item :to="{ name: 'Issues', params: {} }">Issues</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
        <!-- <font-awesome-icon :icon="iconCart" size="lg" class="icon-link" /> -->
        <router-link :to="{ name: 'Settings', params: {} }">
          <font-awesome-icon :icon="iconCog" class="ml-3 icon-link" size="lg" />
        </router-link>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart'
import faCog from '@fortawesome/fontawesome-free-solid/faCog'
import config from '../appSettings.config.js'

export default {
  name: 'NavHeader',
  computed: {
    iconCart () {
      return faShoppingCart
    },
    iconCog () {
      return faCog
    },
    appName () {
      return config.appName
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
.icon-link {
  color: rgba(255, 255, 255, 0.5);
  &:hover {
    color: white;
  }
  &:active {
    color: white;
  }
}
</style>
