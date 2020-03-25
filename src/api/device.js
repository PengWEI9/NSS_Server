import request from '@/utils/request'

export function addDevice(data) {
  return request({
    url: '/device/addDevice',
    method: 'post',
    data
  })
}

export function getDevices() {
  return request({
    url: '/device/getDevices',
    method: 'get'
  })
}

export function deleteDevices(data) {
  return request({
    url: '/device/deleteDevices',
    method: 'post',
    data
  })
}

export function updateDevice(data) {
  return request({
    url: '/device/updateDevice',
    method: 'post',
    data
  })
}
export function updateAlarm(data) {
  return request({
    url: '/device/updateAlarm',
    method: 'post',
    data
  })
}
