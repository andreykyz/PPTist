<template>
  <div class="language-switcher">
    <Select
      class="lang-select"
      :value="currentLocale"
      @update:value="handleLocaleChange"
      :options="localeOptions"
      style="display:inline-flex;width:120px;"
    >
      <template #icon>
        <i-icon-park-outline:translate class="lang-icon" />
      </template>
    </Select>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALSTORAGE_KEY_LOCALE } from '@/i18n'
import Select from '@/components/Select.vue'

interface LocaleOption {
  label: string
  value: string
}

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

const localeOptions = computed<LocaleOption[]>(() => [
  { label: '中文', value: 'zh' },
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' },
])

function handleLocaleChange(value: string | number) {
  const str = String(value)
  locale.value = str
  localStorage.setItem(LOCALSTORAGE_KEY_LOCALE, str)
}
</script>

<style lang="scss" scoped>
.language-switcher {
  display: inline-flex;
  align-items: center;
  padding: 0 4px;
}

.lang-select {
  font-size: 14px;
}

.lang-icon {
  font-size: 16px;
  color: #666;
}
</style>
