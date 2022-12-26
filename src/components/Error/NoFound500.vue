<template>
  <div>
    <!--     path="https://assets6.lottiefiles.com/datafiles/OzG1c5GtuAvq10U/data.json"-->
    <lottie-web-cimo style="height: 80vh" :animationData="errorContent"/>
    <div class="column items-center" style="height: 200px">
      <div class="col-4">
        <q-btn
          icon="arrow_back"
          class="bg-logon-card-input"
          text-color="white"
          unelevated
          label=""
          style="font-size: large;width: 200px"
          @click="back"
        >返 回
        </q-btn>
      </div>
      <div class="col-4">
        <q-btn
          icon="home"
          class="bg-logon-card-input"
          text-color="white"
          unelevated
          label=""
          style="font-size: large;width: 200px"
          @click="home"
        >返 回 首 页
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import LottieWebCimo from '../LottieWebCimo/LottieWebCimo'
import {data500} from "src/ErrorData/data500";

export default {
  name: 'NoFound500',
  components: {LottieWebCimo},
  data() {
    return {
      errorContent: null
    }
  },
  beforeMount() {
    this.errorContent = data500
  },
  methods: {
    back() {
      window.history.back(-1)
    },
    home() {
      window.location.href = "/"
    }
  }
}
</script>
<style lang="css">
.bg-logon-card-input {
  background: linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-logon-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
