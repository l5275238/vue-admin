import request from '@/utils/request'

export function login(username, password) {

  return  new Promise((res,ref)=>{
    if(username=='admin'&&password=='admin'){

      res({
        token:"oAh9N5XqJi1Oc2NavXH23Ska1svk",
      })
    }
    else {
      ref()
    }

  })

  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {  }
  })
}

export function logout() {
  return new Promise((res,ref)=>{
    res()
  })
}
