import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/product/queryAllProducts',
    method: 'post',
    data: params
  })
}
