import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const httpRequest = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: process.env.VUE_APP_REQUEST_TIMEOUT
})
/**
 *
 *  @param {*} config.下的options字段
 *  @param {*} showLoading 是否显示全屏loading 预留
 *  @param {*} showMessage 业主状态码错误是否提示全屏message
 *  @param {*} message 自定义message信息
 *  @param {*} action 业务动作，根据业务动作提示不同信息，所有业务动作在message.js里定义
 */
httpRequest.interceptors.request.use(config => {
  const options = config.options || {}
  const { showLoading = true } = options
  if (showLoading) {
    store.commit('app/START_SERVICE')
  }
  // const token = store.state.user.token
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  // 设置登录token
  // config.headers.token = token
  const { method } = config

  if (method === 'get' && config.params) {
    config.params = filterEmpty(config.params)
  }
  if (!config.json && method === 'post') {
    config.data = queryParse(config.data)
  }

  return config
}, error => {
  Promise.reject(error)
})

httpRequest.interceptors.response.use(
  response => {
    store.commit('app/END_SERVICE')
    const { status, config: { method }, data } = response
    switch (status) {
      case 200: {
        const { code } = data
        //  v1 200 v2 0
        if (code === 0) {
          // post请求带有业务操作
          if (method === 'post') {
            Message({ message: '操作成功', type: 'success' })
          } else {
            Message({ message: '操作失败', type: 'success' })
          }
        }
        break
      }
      case 401:
        Message.closeAll()
        Message({ message: '登录凭证过期, 重新登录', type: 'error' })
        break
    }
    return response.data
  },
  ({ response }) => {
    if (response.status === 401) {
      Message.closeAll()
      Message({
        message: '登录凭证过期, 重新登录',
        type: 'error'
      })
    } else {
      store.commit('app/END_SERVICE')
      Message({
        type: 'error',
        duration: 5 * 1000,
        message: '服务器或网络异常，请稍后重试'
      })
    }

    return Promise.reject(response)
  })

// 编码form表单格式数据
export function queryParse(query) {
  const res = []
  for (const k in query) {
    const val = query[k]
    // 过滤掉 null和undefined等参数
    if (!val && typeof val !== 'number' && typeof val !== 'string' && typeof val !== 'boolean') {
      continue
    }
    if (Array.isArray(val)) {
      val.forEach(arrValue => {
        res.push(`${encodeURIComponent(k)}=${encodeURIComponent(arrValue)}`)
      })
    } else {
      res.push(`${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
    }
  }
  return res.join('&')
}

export function filterEmpty(obj) {
  return Object.keys(obj).reduce((total, next) => {
    const val = obj[next]
    if (val || typeof val === 'number' || typeof val === 'boolean') {
      total[next] = val
    }
    return total
  }, {})
}

export default httpRequest
