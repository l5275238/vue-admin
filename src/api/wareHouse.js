import request from '@/utils/request'
export function getWareHoseList(data){

  return request({
    url:"/depot/queryAllDepots",
    method:"post",
    data:data
  })

}
export function editHose(data) {
  return request({
    url:data.depotId?"/depot/updateDepot":"/depot/addDepot",
    method:"post",
    data:data
  })
}
export function deletHose(data) {
  return request({
    url:"/depot/deleteDepot",
    method:"get",
    params:data
  })
}
export function getHose(data) {
  return request({
    url:"/depot/findDepotById",
    method:"get",
    params:data
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
