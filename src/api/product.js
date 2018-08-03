import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/product/queryAllProducts',
    method: 'post',
    data: params
  })
}
export function delet(params) {
  return request({
    url: '/product/deleteProduct',
    method: 'post',
    data: params
  })

}
export function getAll(params) {
  return request({
    url: '/product/queryListProducts',
    method: 'post',

  })
}
export function get(params) {

  return request({
    url: '/product/findProductById',
    method: 'get',
    params: params
  })

}
export function edit(params) {
  return request({
    url: params.productId?'/product/updateProduct':'/product/addProduct',
    method: 'post',
    data: params
  })

}

