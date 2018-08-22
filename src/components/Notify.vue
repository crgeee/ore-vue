<template>
<notifications group="notification"
               position="bottom right"
               :max="5"
               animation-type="velocity"
               :speed="500" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Notify',
  computed: {
    ...mapState({
      notifications: state => state.notifications
    })
  },
  watch: {
    notifications: {
      handler: function (notifications) {
        if (notifications.length < 1) { return }
        let queueTop = notifications[notifications.length - 1]
        this.$notify({ ...queueTop, group: 'notification' })
        this.$store.dispatch('deleteNotification', queueTop.id)
        console.log(queueTop.error)
      }
    }
  },
  data () {
    return {
      id: 0,
      animation: {
        enter: {
          opacity: [1, 0],
          translateX: [0, -300],
          scale: [1, 0.2]
        },
        leave: {
          opacity: 0,
          height: 0
        }
      }
    }
  },
  methods: {
    clean (group) {
      this.$notify({
        group,
        clean: true
      })
    }
  }
}
</script>

<style lang="scss">
.notification.n-light {
  margin: 10px;
  margin-bottom: 0;
  border-radius: 3px;
  font-size: 13px;
  padding: 10px 20px;
  color: #495061;
  background: #EAF4FE;
  border: 1px solid #D4E8FD;
  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589F3;
  }
}
</style>
