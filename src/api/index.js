import axios from 'axios'
import urljoin from 'url-join'
import config from '../appSettings.config.js'

// base constants
const API_BASE_URI = config.apiBaseUri
const GIT_GRID_URL = config.gitlabUrl
const PRIVATE_TOKEN = config.accessToken
const PRIVATE_TOKEN_URI = 'private_token='

// routes
const GITLAB_ISSUE_URI = '/issues'
const GITLAB_GROUP_URI = '/groups'
const GITLAB_MILESTONE_URI = '/milestones'
const GITLAB_NOTES_URI = '/notes'
const GITLAB_PROJECT_URI = '/projects'
const GITLAB_USER_URI = '/users'

export function buildRequestUrl (route, hasParams) {
  let url = urljoin(GIT_GRID_URL + route)
  if (hasParams) {
    return urljoin(url + '&' + PRIVATE_TOKEN_URI + PRIVATE_TOKEN)
  }
  return urljoin(url + '?' + PRIVATE_TOKEN_URI + PRIVATE_TOKEN)
}

export function fetchGroup (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_GROUP_URI + '/' + id)
  return axios.get(url)
}

export function fetchGroups () {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_GROUP_URI)
  return axios.get(url)
}

export function fetchIssue (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_ISSUE_URI + '/' + id)
  return axios.get(url)
}

export function fetchIssues () {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_ISSUE_URI)
  return axios.get(url)
}

export function fetchIssuesByAssignee (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_ISSUE_URI + '?assignee_id=' + id)
  return axios.get(url)
}

export function fetchIssuesByGroup (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_GROUP_URI + '/' + id + GITLAB_ISSUE_URI)
  return axios.get(url)
}

export function fetchIssuesByGroupMilestone (groupId, milestoneId) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_GROUP_URI + '/' + groupId + GITLAB_MILESTONE_URI + '/' + milestoneId + GITLAB_ISSUE_URI)
  return axios.get(url)
}

export function fetchIssuesByProject (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '/' + id + GITLAB_ISSUE_URI)
  return axios.get(url)
}

export function fetchIssuesByProjectMilestone (projectId, milestoneId) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '/' + projectId + GITLAB_MILESTONE_URI + '/' + milestoneId + GITLAB_ISSUE_URI)
  return axios.get(url)
}

export function fetchMilestonesByGroup (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_GROUP_URI + '/' + id + GITLAB_MILESTONE_URI)
  return axios.get(url)
}

export function fetchMilestonesByProject (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '/' + id + GITLAB_MILESTONE_URI)
  return axios.get(url)
}

export function fetchNotesByProjectIssue (projectId, issueIid) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '/' + projectId + GITLAB_ISSUE_URI + '/' + issueIid + GITLAB_NOTES_URI)
  return axios.get(url)
}

export function fetchNotesByProjectIssues (projectId, issueIids) {
  let batchRequests = []
  for (let value in issueIids) {
    let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '/' + projectId + GITLAB_ISSUE_URI + '/' + issueIids[value] + GITLAB_NOTES_URI)
    batchRequests.push(axios.get(url))
  }
  if (batchRequests.length < 0) {
    throw Error('an error occurred in batching axios requests')
  }
  return axios.all(batchRequests)
}

export function fetchProject (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '/' + id)
  return axios.get(url)
}

export function fetchProjects () {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_PROJECT_URI + '?order_by=name&sort=asc&per_page=100', true)
  return axios.get(url)
}

export function fetchUser (id) {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_USER_URI + '/' + id)
  return axios.get(url)
}

export function fetchUsers () {
  let url = buildRequestUrl(API_BASE_URI + GITLAB_USER_URI)
  return axios.get(url)
}
