<template>
  <div 
    class="input"
    :class="{
      'disabled': disabled,
      'focused': focused,
      'simple': simple,
      'multiline': multiline,
    }"
  >
    <span class="prefix">
      <slot name="prefix"></slot>
    </span>
    <textarea
      v-if="multiline"
      ref="inputRef"
      :disabled="disabled"
      :value="value" 
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="$event => handleInput($event)"
      @focus="$event => handleFocus($event)"
      @blur="$event => handleBlur($event)"
      @change="$event => emit('change', $event)"
    ></textarea>
    <input
      v-else
      type="text"
      ref="inputRef"
      :disabled="disabled"
      :value="value" 
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="$event => handleInput($event)"
      @focus="$event => handleFocus($event)"
      @blur="$event => handleBlur($event)"
      @change="$event => emit('change', $event)"
      @keydown.enter="$event => emit('enter', $event)"
      @keydown.backspace="$event => emit('backspace', $event)"
    />
    <span class="suffix">
      <slot name="suffix"></slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateRef, ref } from 'vue'

withDefaults(defineProps<{
  value: string
  disabled?: boolean
  placeholder?: string
  simple?: boolean
  multiline?: boolean
  maxlength?: number
}>(), {
  disabled: false,
  placeholder: '',
  simple: false,
  multiline: false,
})

const emit = defineEmits<{
  (event: 'update:value', payload: string): void
  (event: 'input', payload: Event): void
  (event: 'change', payload: Event): void
  (event: 'blur', payload: Event): void
  (event: 'focus', payload: Event): void
  (event: 'enter', payload: Event): void
  (event: 'backspace', payload: Event): void
}>()

const focused = ref(false)

const handleInput = (e: Event) => {
  emit('update:value', (e.target as HTMLInputElement).value)
}
const handleBlur = (e: Event) => {
  focused.value = false
  emit('blur', e)
}
const handleFocus = (e: Event) => {
  focused.value = true
  emit('focus', e)
}

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')
const focus = () => {
  if (inputRef.value) inputRef.value.focus()
}

defineExpose({
  focus,
})
</script>

<style lang="scss" scoped>
.input {
  background-color: #fff;
  border: 1px solid #d9d9d9;
  padding: 0 5px;
  border-radius: $borderRadius;
  transition: border-color .25s;
  font-size: 13px;
  display: flex;

  input {
    min-width: 0;
    height: 30px;
    outline: 0;
    border: 0;
    line-height: 30px;
    vertical-align: top;
    color: $textColor;
    padding: 0 5px;
    flex: 1;
    font-size: 13px;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';

    &::placeholder {
      color: #bfbfbf;
    }
  }

  textarea {
    min-width: 0;
    outline: 0;
    border: 0;
    resize: vertical;
    color: $textColor;
    padding: 8px 5px;
    flex: 1;
    font-size: 13px;
    font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
    min-height: 60px;

    &::placeholder {
      color: #bfbfbf;
    }
  }

  &:not(.disabled):hover, &.focused {
    border-color: $themeColor;
  }

  &.disabled {
    background-color: #f5f5f5;
    border-color: #dcdcdc;
    color: #b7b7b7;

    input, textarea {
      color: #b7b7b7;
    }
  }

  &.simple {
    border: 0;
  }

  .prefix, .suffix {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 30px;
    user-select: none;
  }

  &.multiline {
    flex-direction: column;
    align-items: stretch;

    .prefix {
      order: 1;
    }

    textarea {
      order: 2;
      width: 100%;
      box-sizing: border-box;
    }

    .suffix {
      order: 3;
      justify-content: flex-end;
      padding: 5px;
      gap: 8px;
    }
  }
}
</style>