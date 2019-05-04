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

export function addUser(data) {
  return request({
    url: '/jspapi/addUser/1000006',
    method: 'post',
    data
  })
}

export function queryTest(params) {
  return request({
    url: '/api/userTest',
    method: 'get',
    
  })
}
 
export function queryRolesTree(params) {
  return request({
    url: '/api/roles/tree',
    method: 'get',
    
  })
}