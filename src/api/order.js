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
export function getDetai(id) {
  return request({
    url:"order/shop/get",
    method:"post",
    data:{
      id:id,
    }
  })

}
export function deletOrder(id) {
  return request({
    url:"order/shop/delete",
    method:"post",
    data:{
      id:id
    }
  })

}
export function audito(id) {
  return request({
    url:"order/shop/audito",
    method:"post",
    data:{
      id:id
    }
  })

}
export function finished(id) {
  return request({
    url:"/order/shop/finished",
    method:"post",
    data:{
      id:id
    }
  })

}
