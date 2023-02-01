<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-toolbar-title shrink class="text-weight-bold">
      {{title}}
    </q-toolbar-title>
  </q-btn>
</template>

<script>

export default {
  name: 'ToolbarTitle',
  data () {
    return {
      title: sessionStorage.getItem("web_info") == null ? '湮灭软件/用户管理系统' : JSON.parse(sessionStorage.getItem("web_info")).Title
    }
  }
}
</script>
