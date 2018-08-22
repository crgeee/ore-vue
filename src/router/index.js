import Vue from 'vue'
import Router from 'vue-router'

import Dash from '@/views/Dash'
import Issues from '@/views/Issues'
import Milestones from '@/views/Milestones'
import MonthlyReport from '@/views/MonthlyReport'
import NotFound from '@/views/NotFound'
import Project from '@/views/Project'
import Projects from '@/views/Projects'
import Settings from '@/views/Settings'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => ({y: 0}),
  routes: [
    // issues
    {
      path: '/issues',
      name: 'Issues',
      component: Issues,
      meta: { linkText: 'Issues' },
      props: true
    },

    // milestones
    {
      path: '/milestones',
      name: 'Milestones',
      component: Milestones,
      meta: { linkText: 'Milestones' },
      props: true
    },
    {
      path: '/milestones/:milestoneId',
      name: 'Milestone',
      meta: { linkText: 'Milestone' },
      props: true,
      component: Milestones
    },
    {
      path: '/milestones/:milestoneId/issues',
      name: 'milestoneIssues',
      meta: { linkText: 'Issues' },
      props: true,
      component: Issues
    },

    // projects
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      props: true,
      meta: { linkText: 'Projects' },
      children: [
        {
          path: ':projectId',
          meta: { linkText: 'Projects', dynamic: true },
          component: Project
        }
      ]
    },
    {
      name: 'projectIssues',
      path: '/projects/:projectId/issues',
      component: Issues,
      meta: { linkText: 'Issues', paramType: 'project' },
      props: true
    },
    {
      name: 'projectMilestones',
      path: '/projects/:projectId/milestones',
      component: Milestones,
      meta: { linkText: 'Milestones', paramType: 'project' },
      props: true
    },

    // other
    {
      path: '/',
      name: 'Dash',
      component: Dash
    },
    {
      path: '/monthlyreport',
      name: 'MonthlyReport',
      component: MonthlyReport
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { linkText: 'Settings' }
    }
  ]
})

export default router
