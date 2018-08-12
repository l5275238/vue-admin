import request from '@/utils/request'

export function getList(params) {
    return request({
        url:"/user/queryAllUsers",
        method: 'post',
        data: params
    })
}
export function getAllist(params) {

  return request({

    url:"user/findAllByRole",
    method: "get",
    params:{
      roleId:params
    }
  })

}
export function getRoleList(params) {
  return request({
    url:"/role/queryRoleAll",
    method:"get",
    data:{

    }

  })

}
export function deletPeople(id) {
  return request({
    url:"/user/relieveUserRole",
    method:"get",
    params:{
      userId:id
    }
  })
  
}
export function addUserRole(data) {


  return request({
    url:"/user/addUserRole",
    method:"post",
    data:{
      roleId:data.roleId,
      userId:data.id
    },

  })
}
