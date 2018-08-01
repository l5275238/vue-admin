import request from '@/utils/request'

export function getJxs(params) {
  return request({
    url: '/user/findAllByRole',
    method: 'get',
    params: {
      roleId: "3",
    },
  })
}
export function getPurchase() {
  return request({
    method: 'post',
    url: "/depot/queryListDepots",
    data:{
      pageNum:1,
      pageSize:10
    }

  })
}
export function getMenDian() {
  return request({
    method:"post",
    url:"/depot/queryListDepots",
    data:{
      pageNum:1,
      pageSize:10
    }
  })
}
export function getJxsList(params) {
  return request({
    method:"post",
    url:"/finance/profit",
    data:params
  })

}
