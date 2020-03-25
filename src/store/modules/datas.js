import { getDatas } from '@/api/datas'

const mutations = {

}
const state = {

}

const actions = {
  // user login
  getDatas({ commit }, obj) {
    return new Promise((resolve, reject) => {
      getDatas(obj).then(response => {
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

