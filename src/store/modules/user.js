import { login, logout, getInfo, updateInfo, updatePassword, addUser, delUsers, updateAllInfo, getUsers, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
    name: '',
    avatar: '',
    type: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_TYPE: (state, type) => {
    state.type = type
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { nickname, type, username } = data
        commit('SET_NAME', nickname)
        commit('SET_USERNAME', username)
        commit('SET_TYPE', type)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getUserInfo({ commit, state }, username) {
    return new Promise((resolve, reject) => {
      getUserInfo(username).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  updateInfo({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      updateInfo(info).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updatePassword({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      updatePassword(info).then(response => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('SET_NAME', '')
        commit('SET_USERNAME', '')
        commit('SET_TYPE', '')
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('SET_NAME', '')
      commit('SET_USERNAME', '')
      commit('SET_TYPE', '')
      commit('RESET_STATE')
      resolve()
    })
  },

  // get user info
  addUser({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      addUser(info).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getUsers({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUsers().then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  delUsers({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      delUsers(info).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  updateAllInfo({ commit, state }, info) {
    return new Promise((resolve, reject) => {
      updateAllInfo(info).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

