import request from '@/utils/request'

export function login(username, password) {
  return request({
    url:'/user/findByTokenId',
    method: 'get',
    params: {
      tokenId:'oAh9N5T06QH7boMO_v_jolAoICqw',
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/findByTokenId',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
