<template>
  <div>
    <div class="row">
      <div class="col">
        <PageHeader :route="this.$route"></PageHeader>
      </div>
      <div class="col">
        <div class="text-right align-bottom">
          <div v-if="this.$route.params.projectId">
            <PillLabel :text="this.$route.meta.paramType + ': ' + this.$route.params.name + ' ('+ this.$route.params.projectId + ')'" :link="'#'" />
          </div>
        </div>
      </div>
    </div>
    <b-card bg-variant="light">
      <LoadingSpinner/>
      <div class="row">
        <div class="col">
          <div v-if="issues && issues.length && !loading">
            <b-table hover :items="issues" :fields="fields">
              <template slot="assignees" slot-scope="data">
                <span class="hyperlink" v-on:click="showModal({componentName: 'UserModal', modalData: data.item})">
                  {{data.item.assignees.length > 0 ? data.item.assignees[0].name : ''}}
                </span>
              </template>
              <template slot="state" slot-scope="data">
                {{data.item.state | capitalizeStr}}
              </template>
              <template slot="closed_at" slot-scope="data">
                {{data.item.closed_at | formatDate }}
              </template>
              <template slot="show_details" slot-scope="data">
                <div class="text-sm-right">
                  <b-dropdown id="actionDropdown" size="sm" variant="outline-primary" text="Actions">
                    <b-dropdown-item @click.stop="data.toggleDetails">
                      {{ data.detailsShowing ? 'Hide' : 'Show'}} Details
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item>Add to cart</b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-row class="mb-1">
                    <b-col sm="2" class="text-sm-right"><b>Description:</b></b-col>
                    <b-col sm="10">{{ row.item.description }}</b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col sm="2" class="text-sm-right"><b>Milestone:</b></b-col>
                    <b-col sm="10">{{ row.item.milestone.title }}</b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col sm="2" class="text-sm-right"><b>URL:</b></b-col>
                    <b-col sm="10"><a :href="row.item.web_url" target=_blank>{{ row.item.web_url }}</a></b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col sm="2" class="text-sm-right"><b>Created:</b></b-col>
                    <b-col sm="3"><a target=_blank>{{ row.item.created_at | formatDate }}</a></b-col>
                    <b-col sm="2"></b-col>
                    <b-col sm="2" class="text-sm-right"><b>Time Estimate:</b></b-col>
                    <b-col sm="3">{{ row.item.time_stats.time_estimate }}</b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col sm="2" class="text-sm-right"><b>Updated:</b></b-col>
                    <b-col sm="3"><a target=_blank>{{ row.item.updated_at | formatDate }}</a></b-col>
                    <b-col sm="2"></b-col>
                    <b-col sm="2" class="text-sm-right"><b>Time Spent:</b></b-col>
                    <b-col sm="3">{{ row.item.time_stats.total_time_spent }}</b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col sm="2" class="text-sm-right"><b>Author:</b></b-col>
                    <b-col sm="10">{{ row.item.author.name }}</b-col>
                  </b-row>
                  <div class="mb-1 text-right">
                    <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                  </div>
                </b-card>
              </template>
            </b-table>
          </div>
          <div v-else-if="!loading && issues.length < 1">No issues</div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import LoadingSpinner from '@/components/LoadingSpinner'
import { mapMutations, mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'
import PillLabel from '@/components/PillLabel'

export default {
  name: 'Issues',
  metaInfo: {
    title: 'Issues'
  },
  computed: mapState({
    issues: state => state.issues,
    loading: state => state.isLoading
  }),
  components: {
    Breadcrumb,
    LoadingSpinner,
    PillLabel,
    PageHeader
  },
  created () {
    this.$store.dispatch('toggleLoading', true)
    this.loadIssues()
  },
  data () {
    return {
      sortBy: 'id',
      sortDesc: false,
      fields: [
        { key: 'id', sortable: true, isRowHeader: true },
        { key: 'title', sortable: true },
        { key: 'assignees', label: 'Assignee', sortable: true },
        { key: 'state', sortable: true },
        { key: 'closed_at', label: 'Closed', sortable: true },
        { key: 'show_details', label: '', sortable: false }
      ],
      primaryTitle: this.$route.name
    }
  },
  methods: {
    ...mapMutations(['showModal']),
    loadIssues () {
      switch (this.$route.meta.paramType) {
        case 'group':
          this.fetchIssuesByGroup()
          break
        case 'project':
          this.fetchIssuesByProject()
          break
        case 'projectMilestone':
          this.fetchIssuesByProjectMilestone()
          break
        case 'groupMilestone':
          this.fetchIssuesByGroupMilestone()
          break
        default:
          this.fetchIssues()
          break
      }
    },
    fetchIssues () {
      this.$store.dispatch('loadIssues')
        .catch(e => {
          this.$store.dispatch('createNotification', {
            title: 'Error loading Issues',
            text: e.message,
            type: 'error'
          })
        })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    },
    fetchIssuesByGroupMilestone () {
      this.$store.dispatch('loadIssuesByGroupMilestone', {
        groupId: this.$route.params.groupId,
        milestoneId: this.$route.params.milestoneId
      })
        .then(r => this.$store.dispatch('toggleLoading', false))
        .catch(e => {
          this.$store.dispatch('createNotification', {
            title: 'Error loading Issues by Group Milestone',
            text: e.message,
            type: 'error'
          })
        })
    },
    fetchIssuesByProject () {
      console.log('fetchIssuesByProject hit. projectId: ' + this.$route.params.projectId)
      this.$store.dispatch('loadIssuesByProject', {
        id: this.$route.params.projectId
      })
        .catch(e => {
          this.$store.dispatch('createNotification', {
            title: 'Error loading Issues by Project Milestone',
            text: e.message,
            type: 'error'
          })
        })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    },
    fetchIssuesByProjectMilestone () {
      this.$store.dispatch('loadIssuesByProjectMilestone', {
        projectId: this.$route.params.projectId,
        milestoneId: this.$route.params.milestoneId
      })
        .catch(e => {
          this.$store.dispatch('createNotification', {
            title: 'Error loading Issues by Project Milestone',
            text: e.message,
            type: 'error'
          })
        })
        .finally(f => this.$store.dispatch('toggleLoading', false))
    }
  }
}
</script>

<style scoped>
.hyperlink {
  text-decoration: underline;
  cursor: pointer;
}
</style>
