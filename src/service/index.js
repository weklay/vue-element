import request from './request'

/**
 *  get 图片banner
 * @param {*} data
 */
export function getBanner(params) {
  return request({
    url: '/adimg',
    params
  })
}

/**
 *  get 获取游戏分享
 * @param {*} data
 */
export function getGameList(name, start, end) {
  if (start) {
    return request({
      url: '/fname/' + name + '?limit=' + start + ',' + end
    })
  } else {
    return request({
      url: '/fname/' + name
    })
  }
}

/**
 *  post
 * @param {*} data
 */
// export function checkMobile(data) {
//   return request({
//     url: '/mobile/',
//     data,
//     method: 'post'
//   })
// }
