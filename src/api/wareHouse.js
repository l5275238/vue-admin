import request from '@/utils/request'
export function getWareHoseList(data){

  return request({
    url:"/depot/queryAllDepots",
    method:"post",
    data:data
  })

}
export function getOutList(data){

  return request({
    url:"/order/output/query",
    method:"post",
    data:data
  })

}

export function getPurchase(data) {
  return request({
    url:"/order/purchase/query",
    method:"post",
    data:data
  })

}
