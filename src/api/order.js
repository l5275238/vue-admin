import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/order/shop/query',
    method: 'post',
    data: params
  })
}

export function addOrder(params) {
  return request({
    url: params.orderId?'/order/shop/update':'/order/shop/insert',
    method: 'post',
    data: params
  })
}

