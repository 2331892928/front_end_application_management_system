<template>
  <div class="q-pa-md">
    <q-card style="height:100%;width:100%">
      <q-card-section>
<!--        <div class="text-h6">Our Changing Planet</div>-->
<!--        <div class="text-subtitle2">by John Doe</div>-->
      </q-card-section>

      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab label="基本信息" name="one" />
        <q-tab label="账号绑定" name="two" />
        <q-tab label="Tab two" name="three" />
      </q-tabs>

      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <!--第一层-->
        <q-tab-panel name="one">
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">用户名：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="userInfo.username" :dense="true" disable>
                <template v-slot:after>
                  <q-btn round dense flat/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">手机号：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="userInfo.phone" :dense="true" disable>
                <template v-slot:after>
                  <q-btn round dense flat icon="border_color" @click="openTab(true)"/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">邮箱：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="userInfo.email" :dense="true" disable>
                <template v-slot:after>
                  <q-btn round dense flat icon="border_color" @click="openTab(false)"/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">qq：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="userInfo.qq" :dense="true">
                <template v-slot:after>
                  <q-btn round dense flat/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">当前用户组：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="userInfo.explain" :dense="true" disable>
                <template v-slot:after>
                  <q-btn round dense flat/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">新密码：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="newPassword" :dense="true" placeholder="请输入修改后的密码，不修改请留空">
                <template v-slot:after>
                  <q-btn round dense flat/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div class="row">
            <div class="col-1">
              <div class="text-left-subtitle1">API密钥：</div>
            </div>
            <div class="col-8">
              <q-input outlined v-model="newKey" :dense="true" @click="apikeydblclick()" readonly>
                <template v-slot:after>
                  <q-btn round dense flat icon="fas fa-sync" @click="refreshKey()"/>
                </template>
              </q-input>
            </div>
          </div>
          <br/>
          <div>
            <q-btn color="primary" icon="far fa-clone" label="保存" />
          </div>

        </q-tab-panel>
<!--第二层-->
        <q-tab-panel name="two">
          <div class="q-qa-md">
            <q-input outlined value="当前未绑定qq快捷登陆" prefix="" label-slot clearable readonly>
              <template v-slot:prepend>
                <q-avatar>
                  <q-icon name="fab fa-qq" />
                </q-avatar>
              </template>

              <template v-slot:label>
<!--                <strong class="text-deep-orange">You</strong>-->
                绑定qq快捷登陆
              </template>
              <template v-slot:after>
                <q-btn color="primary" dense flat :label="logon.qqTitle"/>
              </template>
            </q-input>
          </div>
          <br/>
          <div class="q-qa-md">
            <q-input outlined value="当前未绑定微信快捷登陆" prefix="" label-slot clearable readonly>
              <template v-slot:prepend>
                <q-avatar>
                  <q-icon name="fab fa-weixin" />
                </q-avatar>
              </template>

              <template v-slot:label>
                <!--                <strong class="text-deep-orange">You</strong>-->
                绑定微信快捷登陆
              </template>
              <template v-slot:after>
                <q-btn color="primary" dense flat :label="logon.wxTitle"/>
              </template>
            </q-input>
          </div>
          <br/>
          <div class="q-qa-md">
            <q-input outlined value="当前未绑定支付宝快捷登陆" prefix="" label-slot clearable readonly>
              <template v-slot:prepend>
                <q-avatar>
                  <q-icon name="fab fa-alipay" />
                </q-avatar>
              </template>

              <template v-slot:label>
                <!--                <strong class="text-deep-orange">You</strong>-->
                绑定支付宝快捷登陆
              </template>
              <template v-slot:after>
                <q-btn color="primary" dense flat :label="logon.aliTitle"/>
              </template>
            </q-input>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <!--  弹出层绑定-->
    <q-dialog v-model="bind.flag" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{bind.title}}</div>
          <div class="text-subtitle1">更改后自动保存,每个邮箱/手机号60秒内仅限发送一次</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="bind.field1" autofocus label="手机号/邮箱">
            <template v-slot:after>
              <q-btn color="primary" icon="send" :label="bind.sendYzmTitle" @click="sendyzm()"/>
            </template>
          </q-input>
          <q-input dense v-model="bind.code" autofocus label="验证码">
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="取消" v-close-popup @click="bind.sendYzmTime = 0"/>
          <q-btn flat label="确定"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {refreshKey} from "src/api/UserApi";
import {copyToClipboard} from "quasar";

export default {
  name: "selfEdit",
  data () {
    return {
      tab: 'one',
      userInfo: null,
      newPassword: null,
      newKey: null,
      bind:{
        flag:false,
        title:'绑定/更换 [手机]',
        field1:null,
        sendYzmTitle: "发送",
        sendYzmTime: 0,
        code: null
      },
      phoneFlag: false,
      logon:{
        qqFlag:false,
        qqTitle:"绑 定 Q Q 快 捷登陆",
        wxFlag:false,
        wxTitle:"绑定 微 信 快捷登陆",
        aliFlag:false,
        aliTitle:"绑定支付宝快捷登陆",
      }
    }
  },
  beforeMount() {
    const userInfo = sessionStorage.getItem('user_info')
    this.userInfo = JSON.parse(userInfo)
    this.newKey = this.userInfo.apikey
    if (this.userInfo.loginInformation == null){
      return
    }
    const logonInfo = JSON.parse(this.userInfo.loginInformation)
    if (this.userInfo.qqid !== null){
      this.logon.qqFlag = true
      this.logon.qqTitle = "解 绑 Q Q 快 捷登陆"
    }
    if (this.userInfo.wxid !== null){
      this.logon.qqFlag = true
      this.logon.qqTitle = "解绑 微 信 快捷登陆"
    }
    if (this.userInfo.alipayid !== null){
      this.logon.qqFlag = true
      this.logon.qqTitle = "解绑支付宝快捷登陆"
    }
  },
  methods:{
    openTab(flag){
      this.bind.flag = true
      if (flag){
        this.bind.title = "绑定/更换 [手机]"
        this.bind.field1 = this.userInfo.phone
      } else {
        this.bind.title = "绑定/更换 [邮箱]"
        this.bind.field1 = this.userInfo.email
      }
    },
    sendyzm(){
      if (this.bind.sendYzmTime > 0 ){
        alert("不能发送")
        return
      }
      //后端检测手机或验证码
      this.bind.sendYzmTime = 60
      let yzmTime=self.setInterval(()=>{
        this.bind.sendYzmTime = this.bind.sendYzmTime -1;
        this.bind.sendYzmTitle = this.bind.sendYzmTime
        if (this.bind.sendYzmTime<0){
          self.clearInterval(yzmTime)
          this.bind.sendYzmTitle = "发送"
        }
      },1000);
    },
    refreshKey(){
      refreshKey().then((e)=>{
        this.newKey = e.data.data.key
        this.$q.notify({
          icon: 'insert_emoticon',
          message: e.data.msg,
          color: 'green',
          position: 'top',
          timeout: 1500
        })
      }).catch((e)=>{
        this.$q.notify({
          icon: 'announcement',
          message: e.data.msg,
          color: 'red',
          position: 'top',
          timeout: 1500
        })
      })
    },
    apikeydblclick(){
      copyToClipboard(this.newKey)
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
    }
  }
}
</script>

<style scoped>

</style>
