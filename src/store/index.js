import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '@/api'

Vue.use(Vuex)

function createMessage (id, title, text, type, dismissAfter, error) {
  return {
    id,
    title,
    text,
    type,
    dismissAfter,
    error
  }
}

const state = {
  // single source of data
  currentGroup: {},
  currentProject: {},
  groups: [],
  isAuthenticated: false,
  issues: [],
  isLoading: false,
  milestones: [],
  modalComponent: null,
  modalData: null,
  modalVisible: false,
  notes: [],
  notifications: [],
  projects: [],
  users: []
}

let maxToastId = 0
const dismissInterval = 5000

const actions = {
  createNotification (context, { title = '', text, type = 'info', dismissAfter = dismissInterval, error }) {
    const id = ++maxToastId
    context.commit('addNotification', createMessage(id, title, text, type, dismissAfter, error))
  },
  deleteNotification (context, id) {
    context.commit('removeNotification', id)
  },
  // asynchronous operations
  loadGroup (context, { id }) {
    return api.fetchGroup(id)
      .then((response) => context.commit('setGroup', { currentGroup: response.data }))
  },
  loadGroups (context) {
    return api.fetchGroups()
      .then((response) => context.commit('setGroups', { groups: response.data }))
  },
  loadIssue (context, { id }) {
    return api.fetchIssue(id)
      .then((response) => context.commit('setIssue', { currentIssue: response.data }))
  },
  loadIssues (context) {
    return api.fetchIssues()
      .then((response) => context.commit('setIssues', { issues: response.data }))
  },
  loadIssuesByAssignee (context, { id }) {
    return api.fetchIssuesByAssignee(id)
      .then((response) => context.commit('setIssues', { issues: response.data }))
  },
  loadIssuesByGroup (context, { id }) {
    return api.fetchIssuesByGroup(id)
      .then((response) => context.commit('setIssues', { issues: response.data }))
  },
  loadIssuesByGroupMilestone (context, { groupId, milestoneId }) {
    return api.fetchIssuesByGroupMilestone(groupId, milestoneId)
      .then((response) => context.commit('setIssues', { issues: response.data }))
  },
  loadIssuesByProject (context, { id }) {
    return api.fetchIssuesByProject(id)
      .then((response) => context.commit('setIssues', { issues: response.data }))
  },
  loadIssuesByProjectMilestone (context, { projectId, milestoneId }) {
    return api.fetchIssuesByProjectMilestone(projectId, milestoneId)
      .then((response) => context.commit('setIssues', { issues: response.data }))
  },
  loadMilestonesByGroup (context, { id }) {
    return api.fetchMilestonesByGroup(id)
      .then((response) => context.commit('setMilestones', { milestones: response.data }))
  },
  loadMilestonesByProject (context, { id }) {
    return api.fetchMilestonesByProject(id)
      .then((response) => context.commit('setMilestones', { milestones: response.data }))
  },
  loadNotesByProjectIssue (context, { projectId, issueIid }) {
    return api.fetchNotesByProjectIssue(projectId, issueIid)
      .then((response) => context.commit('setNotes', { notes: response.data }))
  },
  loadNotesByProjectIssues (context, { id }) {
    let issueIids = []
    for (let value in state.issues) {
      issueIids.push(state.issues[value].iid)
    }
    return api.fetchNotesByProjectIssues(id, issueIids)
      .then((response) => {
        let data = [].concat(...response.map(r => r.data))
        context.commit('setNotes', { notes: data })
      })
  },
  loadProject (context, { id }) {
    return api.fetchProject(id)
      .then((response) => context.commit('setProject', { currentProject: response.data }))
  },
  loadProjects (context) {
    return api.fetchProjects()
      .then((response) => context.commit('setProjects', { projects: response.data }))
  },
  loadUser (context, { id }) {
    return api.fetchUser(id)
      .then((response) => context.commit('setUser', { currentUser: response.data }))
  },
  loadUsers (context) {
    return api.fetchUsers()
      .then((response) => context.commit('setUsers', { users: response.data }))
  },
  toggleLoading (context, loadingValue) {
    context.commit('setLoading', { isLoading: loadingValue })
  }
}

// handles store C.U.D.
const mutations = {
  addNotification (state, notificationData) {
    state.notifications.push(notificationData)
  },
  hideModal (state) {
    state.modalData = null
    state.modalVisible = false
  },
  removeNotification (state, id) {
    state.notifications = state.notifications.filter(m => m.id !== id)
  },
  setGroup (state, payload) {
    state.currentGroup = payload.group
  },
  setGroups (state, payload) {
    state.groups = payload.groups
  },
  setIssue (state, payload) {
    state.currentIssue = payload.currentIssue
  },
  setIssues (state, payload) {
    state.issues = payload.issues
  },
  setLoading (state, payload) {
    state.isLoading = payload.isLoading
  },
  setMilestones (state, payload) {
    state.milestones = payload.milestones
  },
  setNotes (state, payload) {
    state.notes = payload.notes
  },
  setProject (state, payload) {
    state.currentProject = payload.project
  },
  setProjects (state, payload) {
    state.projects = payload.projects
  },
  setUser (state, payload) {
    state.currentUser = payload.currentUser
  },
  setUsers (state, payload) {
    state.users = payload.users
  },
  showModal (state, { componentName, modalData }) {
    state.modalComponent = componentName
    state.modalData = modalData
    state.modalVisible = true
  }
}

// handles store READs
const getters = {
  // reusable data accessors
  isAuthenticated (state) {
    return state.isAuthenticated
  },
  isLoading () {
    return state.isLoading
  }
}

// the store itself
const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
