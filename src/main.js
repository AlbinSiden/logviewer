import Vue from 'vue'
import App from './App.vue'

import router from './router'

import Vuex from 'vuex'

Vue.use(Vuex)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    aiLogs: {},
    piLogs: {},
    IDs: {
      aiLogs: [],
      piLogs: []
    },
    colors: {
      aiLogs: {},
      piLogs: {}
    },
    profiles: {},
    currentProfile: 0,
    elapsedTime: 0,
    timeFormatedLogs: {
      aiLogs: [],
      piLogs: []
    }
  },

  mutations: {

    clearLogs(state, container) {
      state[container] = {}
      state.IDs[container] = []
    },

    // lägger in IDS i container
    updateIds(state, {container, id}) {
      if(state.IDs[container].includes(id)) return

      state[container][id] = []

      state.colors[container][id] = '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);

      state.IDs[container].push(id)
    },

    // lägger in log i object
    updateLogs(state, {container, content, id}) {
      state[container][id].push(content)
    },

    updateProfiles(state, index) {
      state.profiles[index] = []
    },

    pushIdToProfile(state, {index, logId}) {
      state.profiles[index].push(logId)
    },

    updateCurrentProfile(state, index) {
      state.currentProfile = index
    },


    timeFormatLogs(state, time) {
      state.timeFormatedLogs.aiLogs = {}
      state.timeFormatedLogs.piLogs = {}

      const timeToSeconds = (time) => {
        const [hours, minutes] = time.split(':')

        return(
          parseInt(hours) * 3600 + parseInt(minutes) * 60
        )
      }
      let timePeriod = timeToSeconds(time)

      //let firstLoop = true
      let differenceTime = 0

      for(let container of ['aiLogs', 'piLogs']) {
        for(let id of Object.keys(state[container])) {
          for(let log of state[container][id]) {
            let logTime = timeToSeconds(log.startTime.split('T')[1])

            let copyOfLog = Object.assign({}, log)

            if(!(id in state.timeFormatedLogs[container])) {
              state.timeFormatedLogs[container][id] = []
            } 

            if(timePeriod <= logTime && timePeriod+3600 > logTime) {
              copyOfLog.startTimeInSeconds = log.startTimeInSeconds - differenceTime
              state.timeFormatedLogs[container][id].push(copyOfLog)  
            }
          }
        }      
      }
      
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
