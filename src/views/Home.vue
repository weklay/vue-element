<template>
  <div class="game100 w100">
    <div class="title text-center">
      PC游戏下载页
    </div>
    <div class="banner disflex">
      <li v-for="(item, index) in adData.slice(0,3)" :key="index">
        <img :src="item.value" :title="item.name" class="w100">
      </li>
    </div>
    <div class="search disflex-acc">
      <div style="margin: 0 20px">
        密钥:
      </div>
      <el-input v-model="search.token" style="width:300px" placeholder="请输入密钥" />
      <div style="margin: 0 20px">
        <el-radio v-model="genre" label="1">
          全部文件
        </el-radio>
        <el-radio v-model="genre" label="2">
          自定义范围
        </el-radio>
      </div>
      <div v-if="genre === '2'" class="disflex-acc" style="width:650px">
        <div style="margin: 0 20px">
          提取文件从
        </div>
        <el-input-number v-model="search.start" :min="1" :max="10" />
        <div style="margin: 0 20px">
          提取文件从
        </div>
        <el-input-number v-model="search.end" :min="1" :max="100" style="margin-right:20px" />
      </div>
      <el-button type="primary" @click="getGameList">
        查询
      </el-button>
    </div>
    <div style="width: 100%;padding:0 100px;" class="disflex boxsiz">
      <el-table :data="tableData" border style="width: 50%;">
        <el-table-column prop="gameName" label="游戏名称" align="center" width="180" />
        <el-table-column prop="fileName" label="文件名" align="center" width="180" />
        <el-table-column prop="gameUrl" :show-overflow-tooltip="true" align="center" label="下载地址" />
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" class="tag-read" :data-clipboard-text="scope.row.gameUrl" @click="onCopy()">
              复制地址
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="allUrl boxsiz w50">
        <p v-for="(item, index) in tableTxt" :key="index">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner, getGameList } from '@/service'
import Clipboard from 'clipboard'

export default {
  data() {
    return {
      adData: [],
      tableData: [],
      tableTxt: '',
      genre: '1',
      search: {
        start: '',
        end: 10,
        token: ''
      }
    }
  },
  created() {
    this.bannerList()
    this.getGameList()
  },
  methods: {
    // 获取广告banner
    async bannerList() {
      try {
        const { code, data } = await getBanner()
        if (code === 200) {
          this.adData = data
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getGameList() {
      const { token, start, end } = this.search
      let params = {}
      if (this.genre === '1') {
        params = { token }
      } else {
        params = { token, limit: start + ',' + end }
      }
      try {
        const { code, data = {}} = await getGameList(params)
        if (code === 200) {
          this.tableData = data.list
          this.tableTxt = data.txt
        }
      } catch (error) {
        console.error(error)
      }
    },
    onCopy() {
      const clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$message({ message: '复制成功', type: 'success' })
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.game100 {
  ::v-deep
  .el-radio__label{
    font-size: 16px;
  }
  .title {
    background: #99a9bf;
    padding: 10px 0;
  }
  .banner {
    flex: 3;
  }
  .search{
    margin: 40px 0;
    padding: 0 50px;
  }
  .allUrl{
    padding: 20px;
    border: 1px solid #EBEEF5;
    p{
      width: 100%;
      word-wrap: break-word;
      margin-bottom: 5px;
    }
  }
}
</style>
