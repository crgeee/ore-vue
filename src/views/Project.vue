<template>
  <div class="row">
    <div class="col">
      <PageHeader :routeObj="this.$route"></PageHeader>
      <b-card bg-variant="light">
        <LoadingSpinner/>
        <div v-if="projects && projects.length > 0">
          <b-table hover :items="projects" :fields="fields">
            <template slot="show_details" slot-scope="data">
              <div class="text-sm-right">
                <b-dropdown id="actionDropdown" size="sm" variant="outline-primary" text="Actions">
                  <b-dropdown-item @click.stop="data.toggleDetails">
                    {{ data.detailsShowing ? 'Hide' : 'Show'}} Details
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link :to="{ path: 'projectMilestones', params: { projectId: data.item.id, name: data.item.name } }">
                      View Milestones
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <router-link :to="{ name: 'projectIssues', params: { projectId: data.item.id, name: data.item.name } }">
                      View Issues
                    </router-link>
                  </b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item>Add to cart</b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
            <template slot="row-details" slot-scope="row">
              <b-card>
                <b-row class="mb-2" v-if="row.item.owner">
                  <b-col sm="2" class="text-sm-right"><b>Owner:</b></b-col>
                  <b-col sm="9">{{ row.item.owner.name }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="2" class="text-sm-right"><b>Description:</b></b-col>
                  <b-col sm="9">{{ row.item.description }}</b-col>
                </b-row>
                <b-row class="mb-2">
                  <b-col sm="2" class="text-sm-right"><b>URL:</b></b-col>
                  <b-col sm="9"><a :href="row.item.web_url" target=_blank>{{ row.item.web_url }}</a></b-col>
                </b-row>
                <div class="mb-2 text-right">
                  <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
                </div>
              </b-card>
            </template>
          </b-table>
        </div>
        <div v-else-if="!loading && projects.length < 1">No projects</div>
      </b-card>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner'
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'

export default {
  name: 'Project',
  components: {
    LoadingSpinner,
    PageHeader
  },
  computed: mapState({
    loading: state => state.isLoading,
    project: state => state.project
  }),
  created () {
  },
  data () {
    return {
      sortBy: 'id',
      fields: [
        { key: 'id', sortable: true, isRowHeader: true },
        { key: 'name', sortable: true },
        { key: 'namespace.name', label: 'Namespace', sortable: true },
        { key: 'show_details', label: '', sortable: false }
      ]
    }
  },
  metaInfo: {
    title: 'Project'
  }
}
</script>
