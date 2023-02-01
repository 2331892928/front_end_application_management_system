<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      :loading="loading"
      :filter="filter"
      :filter-method="afilter"
      no-data-label="你还没有应用，新建一个吧"
      no-results-label="没有这个应用"
      loading-label="稍等哦，正在加载中"
      rows-per-page-label="每页显示数量："
      row-key="name"
    >
      <!--      主体-->
      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <div class="q-gutter-sm">
            <q-btn
              round
              color="grey-4"
              text-color="grey-7"
              icon="add_link"
              size="10px"
              @click="shuttleBoxGetData(props.row.id,props.row.name,props.row.timeEndAt)"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
              >
                绑定域名
              </q-tooltip>
            </q-btn>
            <q-btn
              round
              color="grey-4"
              text-color="grey-7"
              icon="delete"
              size="10px"
              @click="deleteSSLCert1(props.row.id,props.row.edit)"
            >
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
              >
                删除证书
              </q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-icon="props">
        <q-td :props="props">
          <q-img
            placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
            :src="props.row.icon"
            style="width: 64px;height: 64px"
            @click="aimgView(props.row.icon)"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge color="green" v-if="props.row.status">
            正常
          </q-badge>
          <q-badge color="red" v-else>
            禁用
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-apikey="props">
        <q-td :props="props">
          <q-badge color="green" @click="acopy(props.row.apikey)">
          {{ props.row.apikey }}
          </q-badge>
        </q-td>
      </template>

<!--      顶部-->
      <template v-slot:top>
        <q-btn color="primary" label="添加应用" @click="addApp()" />
        <q-btn class="q-ml-sm" color="primary" label="禁用应用" @click="stopApp()" />
        <q-btn class="q-ml-sm" color="primary" label="启用应用" @click="enableApp()" />
        <q-btn class="q-ml-sm" color="primary" label="删除应用" @click="delApp()" />
        <q-btn class="q-ml-sm" color="primary" label="重新加载" @click="refreshAppList()" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter" placeholder="键入应用名或id 回车以搜索" style="width:50%">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
<!--消息-->
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Oh... {{ message }}
          </span>
          <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
        </div>
      </template>
    </q-table>
    <q-dialog v-model="Aimg" persistent>
<!--      <q-card style="width:100%;height: 100%" :dark="false">-->
<!--        <q-card-section style="width:100%" >-->
          <q-img
            width="100%"
            placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
            :src="Aimg_src"
            :style="Aimg_four"
          ></q-img>
          <div>
            <q-btn icon="fas fa-undo" @click="aimg_three()"></q-btn>
            <q-btn class="q-ml-sm" icon="cancel" @click="Aimg = false"></q-btn>
          </div>
<!--        </q-card-section>-->
<!--      </q-card>-->
    </q-dialog>
  </div>
</template>

<script>
import {copyToClipboard, Loading} from "quasar";
import {getAppList} from "src/api/AppApi";
import moment from "moment";
import AView from "components/AView/AView";

export default {
  name: "appList",
  components: {AView},
  data() {
    return {
      data :[],
      filter: '',
      loading: true,
      Aimg: false,
      Aimg_two: 0,
      Aimg_four: "borderRadius: 15px 15px 15px 15px; transform:rotate(0deg)",
      Aimg_src: null,
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true,
          style: 'width: 1%'
          // headerStyle: 'width: 1%',
        },
        { name: 'icon', align: 'center', required: true, label: '应用图标', field: 'icon', sortable: true, style: 'width: 5%' },
        { name: 'name', align: 'center',label: '应用名称', field: 'name', sortable: true, style: 'width: 5%' },
        { name: 'apikey', align: 'center',label: 'apikey', field: 'apikey', style: 'width: 5%' },
        { name: 'createTime', align: 'center',label: '创建时间', field: row => row.createTime, format: val => {
            return moment(parseInt(val)).format('YYYY/MM/DD hh:mm:ss')
          }, style: 'width: 5%' },
        { name: 'status', align: 'center',label: '启用状态', field: 'status', style: 'width: 1%' },
        { name: 'operation', align: 'center', label: '操作', style: 'width: 1%' },
      ],
    }
  },
  mounted() {
    this.refreshAppList()
    // Loading.show({
    //   message: '加载中，请稍后'
    // })
    //
    // Loading.hide()
  },
  methods:{
    addApp(){
      console.log(moment(parseInt('1672272035000')).format('YYYY/MM/DD hh:mm:ss'))
      this.$q.notify({
        icon: 'insert_emoticon',
        message: '测试',
        color: 'green',
        position: 'top',
        timeout: 1500
      })
    },
    delApp(){
      this.$q.notify({
        icon: 'insert_emoticon',
        message: '测试',
        color: 'green',
        position: 'top',
        timeout: 1500
      })
    },
    aimgView(src){
      this.Aimg = true
      this.Aimg_src = src
    },
    aimg_three(){
      if (this.Aimg_two === 0){
        this.Aimg_two = -90
      } else {
        this.Aimg_two = this.Aimg_two - 90
      }
      console.log(this.Aimg_two)
      if (this.Aimg_two === -360 || this.Aimg_two === 360){
        this.Aimg_two = 0;
      }
      this.Aimg_four = "borderRadius: 15px 15px 15px 15px; transform:rotate("+this.Aimg_two.toString()+"deg)"
    },
    refreshAppList(){
      getAppList().then((e)=>{
        if (e.data.code === 200){
          this.data = e.data.data;
        } else {
          this.$q.notify({
            icon: 'announcement',
            message: e.data.msg,
            color: 'red',
            position: 'top',
            timeout: 1500
          })
        }
      }).catch((e)=>{
        console.log(e)
      })

      this.loading = false
    },
    acopy(text){
      copyToClipboard(text)
        .then(() => {
          this.$q.notify({
            icon: 'insert_emoticon',
            message: "复制成功",
            color: 'green',
            position: 'top',
            timeout: 1500
          })
        })
        .catch(() => {
          this.$q.notify({
            icon: 'announcement',
            message: "复制失败",
            color: 'red',
            position: 'top',
            timeout: 1500
          })
        })
    },
    afilter(rows, terms, cols, getCellValue){
      let newRows = rows.filter((item) => {
        let flag = item.id.toString().indexOf(terms)
        if (flag === -1){
          flag = item.name.indexOf(terms)
        }
        return flag !== -1
      })
      return newRows
    },
    stopApp(){
      this.$q.notify({
        icon: 'insert_emoticon',
        message: '测试',
        color: 'green',
        position: 'top',
        timeout: 1500
      })
    },
    enableApp(){
      this.$q.notify({
        icon: 'insert_emoticon',
        message: '测试',
        color: 'green',
        position: 'top',
        timeout: 1500
      })
    }
  }
}
</script>

<style scoped>

</style>
