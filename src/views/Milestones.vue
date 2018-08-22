<template>
  <div>
    <div class="row">
      <div class="col">
        <PageHeader :route="this.$route"></PageHeader>
      </div>
    </div>
    <b-card bg-variant="light">
      <div class="form-row">
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelectGroups">By Group</label>
            </div>
            <select class="custom-select" id="inputGroupSelectGroups" v-on:change="getMilestonesByGroup">
              <option disabled selected>Choose a group...</option>
              <option v-for="group in groups" v-bind:key="group.id">{{group.name}}</option>
            </select>
          </div>
        </div>
        <div class="col">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="inputGroupSelectProjects">By Project</label>
            </div>
            <select class="custom-select" id="inputGroupSelectProjects" v-on:change="getMilestonesByProject">
              <option disabled selected>Choose a project...</option>
              <option v-for="project in projects" v-bind:key="project.id" v-bind:value="project.id">{{project.name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row" v-if="milestones && milestones.length">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Start</th>
                <th scope="col">Due</th>
                <th scope="col">State</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="milestone of milestones" v-bind:key="milestone.id">
                <th scope="row">{{milestone.title}}</th>
                <td>{{milestone.start_date | formatDate}}</td>
                <td>{{milestone.due_date | formatDate}}</td>
                <td>{{milestone.state | capitalizeStr}}</td>
                <td>
                  <b-dropdown id="actionDropdown" size="sm" text="Actions">
                    <b-dropdown-item>Show Details</b-dropdown-item>
                    <b-dropdown-item>
                      <div v-if="milestoneType === 'project'">
                        <router-link :to="{ name: 'milestoneIssues', params: { projectId: milestoneTypeId,  milestoneId: milestone.id } }">
                          View Issues
                        </router-link>
                      </div>
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Add to cart</b-dropdown-item>
                  </b-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col">No milestones</div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'Milestones',
  metaInfo: {
    title: 'Milestones'
  },
  components: {
    PageHeader
  },
  computed: mapState({
    groups: state => state.groups,
    loading: state => state.isLoading,
    milestones: state => state.milestones,
    projects: state => state.projects
  }),
  created () {
    this.$store.dispatch('toggleLoading', true)
    this.getGroups()
    this.getProjects()
  },
  data () {
    return {
      milestoneType: '',
      milestoneTypeId: 0
    }
  },
  methods: {
    getGroups () {
      this.$store.dispatch('loadGroups')
        .catch(e => {
          this.$store.dispatch('createNotification', { title: 'Error loading Groups', text: e.message, type: 'error' })
        })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    },
    getMilestonesByGroup (e) {
      this.milestoneType = 'group'
      this.milestoneTypeId = e.target.value
      this.$store.dispatch('loadMilestonesByGroup', { id: e.target.value })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    },
    getMilestonesByProject (e) {
      this.milestoneType = 'project'
      this.milestoneTypeId = e.target.value
      this.$store.dispatch('loadMilestonesByProject', { id: e.target.value })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    },
    getProjects () {
      this.$store.dispatch('loadProjects')
        .catch(e => {
          this.$store.dispatch('createNotification', { title: 'Error loading Projects', text: e.message, type: 'error' })
        })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    }
  }
}
</script>
