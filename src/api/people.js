import request from '@/utils/request'

export function getList(params) {
    return request({
        url:"/user/queryAllUsers",
        method: 'post',
        data: params
    })
}