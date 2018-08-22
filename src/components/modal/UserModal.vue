<template>
  <div class="ore-modal-login">
    <div class="form-group">
      <label for="name">User</label>
      <input name="name" class="form-control">
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input name="password" type="password" class="form-control">
      {{modalData.assignee.name}}
    </div>

    <button type="cancel" class="btn btn-default" @click="hideModal">Cancel</button>
    <button type="submit" class="btn btn-default" @click="hideModal">Login</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'UserModal',
  props: ['modalData'],
  methods: {
    ...mapMutations([
      'hideModal'
    ]),
    getIssues () {

    }
  }
}
</script>

<style lang="scss">
.ore-modal-login {
  width: 400px;
  > :not(:first-child) {
    margin-top: 1em;
  }
  input {
    width: 100%;
  }
}
</style>
