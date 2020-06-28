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
      <el-input v-model="search.name" style="width:400px" placeholder="输入提取码" />
      <div style="margin: 0 20px">
        提取文件从
      </div>
      <el-input-number v-model="search.start" :min="1" :max="10" />
      <div style="margin: 0 20px">
        提取文件从
      </div>
      <el-input-number v-model="search.end" :min="1" :max="1000" style="margin-right:20px" />
      <el-button type="primary" @click="getGameList">
        查询
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="gameName" label="游戏名称" width="180" />
      <el-table-column prop="fileName" label="文件名" width="180" />
      <el-table-column prop="gameUrl" :show-overflow-tooltip="true" label="下载地址" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" class="tag-read" :data-clipboard-text="scope.row.gameUrl" @click="onCopy()">
            复制地址
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
      search: {
        name: '',
        start: '',
        end: ''
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
      const { name, start, end } = this.search
      try {
        const { code, data } = await getGameList(name, start, end)
        if (code === 200) {
          this.tableData = data
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
}
</style>
