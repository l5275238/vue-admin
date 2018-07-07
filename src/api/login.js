import request from '@/utils/request'

export function login(username, password) {
  debugger
  return  new Promise(res,ref=>{
    if(username==='admin',password==='admin'){
      res({
        token:1111,
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
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
