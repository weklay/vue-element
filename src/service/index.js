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
export function getGameList(params) {
  return request({
    url: '/fname',
    params
  })
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
