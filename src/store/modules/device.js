import { addDevice, deleteDevices, updateDevice, getDevices, updateAlarm } from '@/api/device'

const mutations = {

}
const state = {

}

const actions = {
  // user login
  addDevice({ commit }, obj) {
    return new Promise((resolve, reject) => {
      addDevice(obj).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteDevices({ commit }, obj) {
    return new Promise((resolve, reject) => {
      deleteDevices(obj).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDevice({ commit }, obj) {
    return new Promise((resolve, reject) => {
      updateDevice(obj).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateAlarm({ commit }, obj) {
    return new Promise((resolve, reject) => {
      updateAlarm(obj).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDevices({ commit }) {
    return new Promise((resolve, reject) => {
      getDevices().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

