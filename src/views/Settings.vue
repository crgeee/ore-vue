<template>
  <div class="row">
    <div class="col">
      <h1>{{ pageTitle }}</h1>
      <b-card bg-variant="light">
        <b-form>
          <b-form-group horizontal
                      id="labelAccessToken"
                      label="Access Token"
                      label-class="font-weight-bold pt-0"
                      label-for="inputAccessToken"
                      :label-cols="3"
                      description="Example format: kdjMtWdgexMMtCdtJysY. See <a href='https://docs.gitlab.com/ee/api/#authentication' target='_blank'>Authentication</a> documentation for more info.">
            <b-form-input id="inputAccessToken"
                        type="text"
                        required
                        :disabled="!editable"
                        v-model="configChanges.accessToken"
                        placeholder="Enter new token">
            </b-form-input>
          </b-form-group>
          <b-form-group id="labelGitlabUrl"
                      label="Gitlab URL"
                      label-class="font-weight-bold pt-0"
                      label-for="inputGitlabUrl"
                      :label-cols="3"
                      description="Example: http://gitlab.com.  See <a href='https://docs.gitlab.com/ee/api/#basic-usage' target='_blank'>Basic usage</a> documentation for more info."
                      horizontal>
            <b-form-input id="inputGitlabUrl"
                        type="text"
                        required
                        :disabled="!editable"
                        v-model="configChanges.gitlabUrl"
                        placeholder="Enter new url">
            </b-form-input>
          </b-form-group>
          <b-form-group id="labelApiBaseUri"
                      label="API Base URI"
                      label-class="font-weight-bold pt-0"
                      label-for="inputApiBaseUri"
                      :label-cols="3"
                      description="Example: /api/v4. See <a href='https://docs.gitlab.com/ee/api/#basic-usage' target='_blank'>Basic usage</a> documentation for more info."
                      horizontal>
            <b-form-input id="inputApiBaseUri"
                        type="text"
                        required
                        :disabled="!editable"
                        v-model="configChanges.apiBaseUri"
                        placeholder="Enter new base uri">
            </b-form-input>
          </b-form-group>
          <b-form-group id="labelAppName"
                      label="Application Name"
                      label-class="font-weight-bold pt-0"
                      label-for="inputAppName"
                      :label-cols="3"
                      horizontal>
            <b-form-input id="inputAppName"
                        type="text"
                        required
                        :disabled="!editable"
                        v-model="configChanges.appName"
                        placeholder="Enter new application name">
            </b-form-input>
          </b-form-group>
          <div class="text-right">
            <div v-if="editable">
              <b-button type="submit" variant="primary" class="mr-2">Submit</b-button>
              <b-button variant="secondary" @click="editable=false">Cancel</b-button>
            </div>
            <div v-else>
              <b-button variant="secondary" @click="editable=true">Edit</b-button>
            </div>
          </div>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import config from '../appSettings.config.js'

export default {
  name: 'Settings',
  metaInfo: {
    title: 'Settings'
  },
  data () {
    return {
      config: config,
      configChanges: Object.assign(config),
      editable: false,
      pageTitle: this.$route.name
    }
  }
}
</script>
