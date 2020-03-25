import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
export function getUserInfo(username) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: { username }
  })
}

export function updateInfo(data) {
  return request({
    url: '/user/updateBaseInfo',
    method: 'post',
    data
  })
}

export function updatePassword(data) {
  return request({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function addUser(data) {
  return request({
    url: '/user/addUser',
    method: 'post',
    data
  })
}
export function getUsers() {
  return request({
    url: '/user/getUsers',
    method: 'get'
  })
}
export function delUsers(data) {
  return request({
    url: '/user/delUsers',
    method: 'post',
    data
  })
}
export function updateAllInfo(data) {
  return request({
    url: '/user/updateAllInfo',
    method: 'post',
    data
  })
}
