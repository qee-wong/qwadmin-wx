import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getWxUserBycode(params){
    return request({
        url: '/jspapi/1000006',
        method: 'get',
        params
    })
    
}
