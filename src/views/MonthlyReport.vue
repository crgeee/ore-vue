<template>
  <div>
    <div class="row">
      <div class="col">
        <h1>{{ primaryTitle }}</h1>
      </div>
    </div>
    <div class="form-row">
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputStartDate">Start Date</label>
          </div>
          <input type="date" :value="monthFirstDay" name="inputStartDate" min="2016-01-01" max="2020-12-31" class="form-control">
        </div>
      </div>
      <div class="col">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputEndDate">End Date</label>
          </div>
          <input type="date" :value="monthLastDay" id="inputEndDate" min="2016-01-01" max="2020-12-31" class="form-control">
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
    <div class="row">
      <div class="col">
        <div v-if="issues && issues.length">
          <b-table hover :items="issues" :fields="fields">
            <template slot="assignees" slot-scope="data">
              <span class="hyperlink" v-on:click="showModal({componentName: 'UserModal', modalData: data.item})">
                {{data.item.assignees.length > 0 ? data.item.assignees[0].name : ''}}
              </span>
            </template>
            <template slot="state" slot-scope="data">
              {{data.item.state | capitalizeStr}}
            </template>
            <template slot="show_details" slot-scope="row">
              <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
               {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
              </b-button>
            </template>
            <template slot="row-details" slot-scope="row">
              <b-card>
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
        <div v-else>No issues</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MonthlyReport',
  metaInfo: {
    title: 'Monthly Report'
  },
  data () {
    return {
      primaryTitle: 'Monthly Report',
      todayDate: new Date(),
      monthFirstDay: new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1),
      monthLastDay: new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0)
    }
  },
  computed: mapState({
    issues: state => state.issues
  })
}
</script>
