import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/order/shop/query',
    method: 'post',
    data: params
  })
}
