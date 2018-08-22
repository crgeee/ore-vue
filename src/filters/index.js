import Vue from 'vue'
import moment from 'moment'

Vue.filter('capitalizeStr', str => (str != null && str.length > 0) ? str.charAt(0).toUpperCase() + str.slice(1) : str)
Vue.filter('formatDate', dt => (dt != null && dt.length > 0) ? moment(dt).format('MM/DD/YYYY') : dt)
Vue.filter('formatPath', path => path.split('/').filter((val) => val))
Vue.filter('trimStr', (str, trimLen) => (str != null && str.length > 0) ? str.substring(0, trimLen || 300) + '...' : str)
