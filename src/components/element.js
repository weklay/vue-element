// 自动按需引入 element 组件
import { Loading, Message, Table, TableColumn, Input, button } from 'element-ui'
const ElementS = [Loading, Table, TableColumn, Input, button]

export default {
  install(Vue) {
    Vue.prototype.$message = Message
    ElementS.forEach(elementUI => [
      Vue.use(elementUI)
    ])
  }
}
