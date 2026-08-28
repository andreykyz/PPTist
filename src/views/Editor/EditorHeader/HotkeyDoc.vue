<template>
  <div class="hotkey-doc">
    <template v-for="item in HOTKEY_DOC" :key="item.type">
      <div class="title">{{t(item.type)}}</div>
      <div class="hotkey-item" v-for="hotkey in item.children" :key="hotkey.label">
        <template v-if="hotkey.value">
          <div class="label">{{t(hotkey.label)}}</div>
          <div class="value">{{hotkey.value}}</div>
        </template>
        <div class="row" v-else>{{t(hotkey.label)}}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { HOTKEY_DOC } from '@/configs/hotkey' 
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="scss" scoped>
.hotkey-doc {
  height: 100%;
  overflow: auto;
  font-size: 12px;
  margin: 0 -15px;
  padding: 0 15px 15px;
}
.title {
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #e5e5e5;
  padding: 25px 0 5px 0;

  &:first-child {
    padding-top: 0;
  }
}
.hotkey-item {
  border-bottom: 1px solid #e5e5e5;
  padding: 15px 0 5px 0;
  display: flex;
  align-items: center;
}
.label {
  width: 140px;

  @include ellipsis-oneline();
}
</style>