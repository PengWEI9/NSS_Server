import request from '@/utils/request'

export function getDatas(data) {
  return request({
    url: '/data/getDatas',
    method: 'post',
    data
  })
}
