## How to Define a Custom Element

Let's use the [Web Page Element] as an example to walk through the process of defining a custom element.
> The complete code is at https://github.com/pipipi-pikachu/PPTist/tree/document-demo

> Note: Because the versions have been updated, the code in this document and the repository cannot be used by directly copy-pasting. This document only provides the approach.

### Write the Structure and Configuration of the New Element
First, define the structure of the element and add its type.
```typescript 
// types/slides.ts

export const enum ElementTypes {
  TEXT = 'text',
  IMAGE = 'image',
  SHAPE = 'shape',
  LINE = 'line',
  CHART = 'chart',
  TABLE = 'table',
  LATEX = 'latex',
  VIDEO = 'video',
  AUDIO = 'audio',
  FRAME = 'frame', // add
}

// add
export interface PPTFrameElement extends PPTBaseElement {
  type: 'frame'
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  url: string; // web page link address
}

// modify the PPTElement type
export type PPTElement = PPTTextElement | PPTImageElement | PPTShapeElement | PPTLineElement | PPTChartElement | PPTTableElement | PPTLatexElement | PPTVideoElement | PPTAudioElement | PPTFrameElement
```

In the configuration file, add the Chinese name of the new element, as well as its minimum size:
```typescript
// configs/element

export const ELEMENT_TYPE_ZH = {
  text: '文本',
  image: '图片',
  shape: '形状',
  line: '线条',
  chart: '图表',
  table: '表格',
  video: '视频',
  audio: '音频',
  frame: '网页', // add
}

export const MIN_SIZE = {
  text: 20,
  image: 20,
  shape: 15,
  chart: 200,
  table: 20,
  video: 250,
  audio: 20,
  frame: 200, // add
}
```

### Write the Component for the New Element
Then start writing the component for the element:
```html
<!-- views/components/element/FrameElement/index.vue -->

<template>
  <div class="editable-element-frame"
    :style="{
      top: elementInfo.top + 'px',
      left: elementInfo.left + 'px',
      width: elementInfo.width + 'px',
      height: elementInfo.height + 'px',
    }"
  >
    <div
      class="rotate-wrapper"
      :style="{ transform: `rotate(${elementInfo.rotate}deg)` }"
    >
      <div 
        class="element-content" 
        v-contextmenu="contextmenus"
        @mousedown="$event => handleSelectElement($event)"
        @touchstart="$event => handleSelectElement($event)"
      >
        <iframe 
          :src="elementInfo.url"
          :width="elementInfo.width"
          :height="elementInfo.height"
          :frameborder="0" 
          :allowfullscreen="true"
        ></iframe>

        <div class="drag-handler top"></div>
        <div class="drag-handler bottom"></div>
        <div class="drag-handler left"></div>
        <div class="drag-handler right"></div>

        <div class="mask" 
          v-if="handleElementId !== elementInfo.id"
          @mousedown="$event => handleSelectElement($event, false)"
          @touchstart="$event => handleSelectElement($event, false)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'
import { PPTFrameElement } from '@/types/slides'
import { ContextmenuItem } from '@/components/Contextmenu/types'

const props = defineProps({
  elementInfo: {
    type: Object as PropType<PPTFrameElement>,
    required: true,
  },
  selectElement: {
    type: Function as PropType<(e: MouseEvent | TouchEvent, element: PPTFrameElement, canMove?: boolean) => void>,
    required: true,
  },
  contextmenus: {
    type: Function as PropType<() => ContextmenuItem[] | null>,
  },
})

const { handleElementId } = storeToRefs(useMainStore())

const handleSelectElement = (e: MouseEvent | TouchEvent, canMove = true) => {
  e.stopPropagation()
  props.selectElement(e, props.elementInfo, canMove)
}
</script>

<style lang="scss" scoped>
.editable-element-frame {
  position: absolute;
}
.element-content {
  width: 100%;
  height: 100%;
  cursor: move;
}
.drag-handler {
  position: absolute;

  &.top {
    height: 20px;
    left: 0;
    right: 0;
    top: 0;
  }
  &.bottom {
    height: 20px;
    left: 0;
    right: 0;
    bottom: 0;
  }
  &.left {
    width: 20px;
    top: 0;
    bottom: 0;
    left: 0;
  }
  &.right {
    width: 20px;
    top: 0;
    bottom: 0;
    right: 0;
  }
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
```

In addition, we need another basic version of the component without editing functionality, used for display in thumbnail/presentation mode:
```html
<!-- views/components/element/FrameElement/BaseFrameElement.vue -->

<template>
  <div class="base-element-frame"
    :style="{
      top: elementInfo.top + 'px',
      left: elementInfo.left + 'px',
      width: elementInfo.width + 'px',
      height: elementInfo.height + 'px',
    }"
  >
    <div
      class="rotate-wrapper"
      :style="{ transform: `rotate(${elementInfo.rotate}deg)` }"
    >
      <div class="element-content">
        <iframe 
          :src="elementInfo.url"
          :width="elementInfo.width"
          :height="elementInfo.height"
          :frameborder="0" 
          :allowfullscreen="true"
        ></iframe>

        <div class="mask"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { PPTFrameElement } from '@/types/slides'

const props = defineProps({
  elementInfo: {
    type: Object as PropType<PPTFrameElement>,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.base-element-frame {
  position: absolute;
}
.element-content {
  width: 100%;
  height: 100%;
}
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
```

Here you might notice that these two components are very similar. Indeed, for relatively simple element components, the editable and non-editable versions are highly consistent; the non-editable version may simply lack a few methods. However, for more complex element components, the differences between the two can be quite large (you can compare the two versions of the text element and image element for specifics). Therefore, you can decide for yourself whether to merge and abstract the two into a single component; this won't be expanded upon here.

After writing the element component, we need to use it in the appropriate places, which may include:

- Thumbnail element component `views/components/ThumbnailSlide/ThumbnailElement.vue`
- Presentation element component `views/Screen/ScreenElement.vue`
- Editable element component `views/Editor/Canvas/EditableElement.vue`
- Mobile editable element component `views/Mobile/MobileEditor/MobileEditableElement.vue`

Generally speaking, the first two use the non-editable version, and the latter two use the editable version.
Here we only use the editable element component on the canvas as an example:
```html
<!-- views/Editor/Canvas/EditableElement.vue -->

<script lang="ts" setup>
 import FrameElement from '@/views/components/element/FrameElement/index.vue'

 const currentElementComponent = computed(() => {
  const elementTypeMap = {
    [ElementTypes.IMAGE]: ImageElement,
    [ElementTypes.TEXT]: TextElement,
    [ElementTypes.SHAPE]: ShapeElement,
    [ElementTypes.LINE]: LineElement,
    [ElementTypes.CHART]: ChartElement,
    [ElementTypes.TABLE]: TableElement,
    [ElementTypes.LATEX]: LatexElement,
    [ElementTypes.VIDEO]: VideoElement,
    [ElementTypes.AUDIO]: AudioElement,
    [ElementTypes.FRAME]: FrameElement, // add
  }
  return elementTypeMap[props.elementInfo.type] || null
})
</script>
```

For the editable element on the canvas, you also need to add an operation node `Operate` for the element (which generally includes eight resize points, four edge lines, and one rotation point). For special elements (such as a line, whose operation nodes are clearly different from others), you can write this component yourself, but in general you can directly use the already-written common operation nodes:
```html
<!-- src\views\Editor\Canvas\Operate\index.vue -->

<script lang="ts" setup>
const currentOperateComponent = computed(() => {
  const elementTypeMap = {
    [ElementTypes.IMAGE]: ImageElementOperate,
    [ElementTypes.TEXT]: TextElementOperate,
    [ElementTypes.SHAPE]: ShapeElementOperate,
    [ElementTypes.LINE]: LineElementOperate,
    [ElementTypes.TABLE]: TableElementOperate,
    [ElementTypes.CHART]: CommonElementOperate,
    [ElementTypes.LATEX]: CommonElementOperate,
    [ElementTypes.VIDEO]: CommonElementOperate,
    [ElementTypes.AUDIO]: CommonElementOperate,
    [ElementTypes.FRAME]: CommonElementOperate, // add
  }
  return elementTypeMap[props.elementInfo.type] || null
})
</script>
```

### Write the Right-Side Element Editing Panel
Next, you need to add a style panel for the element. When the element is selected, the right toolbar will automatically focus on this panel. You need to add some settings you think are necessary to operate the element itself. Just remember one thing: modifying the element is actually modifying the element's data, that is, the various fields in the structure defined at the beginning.
Also, after modifying the element, don't forget to add the operation to the history.
```html
<!-- src\views\Editor\Toolbar\ElementStylePanel\FrameStylePanel.vue -->

<template>
  <div class="frame-style-panel">
    <div class="row">
      <div>Web page link:</div>
      <Input v-model:value="url" placeholder="Please enter a web page link" />
      <Button @click="updateURL()">OK</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMainStore, useSlidesStore } from '@/store'
import useHistorySnapshot from '@/hooks/useHistorySnapshot'

const slidesStore = useSlidesStore()
const { handleElementId } = storeToRefs(useMainStore())

const { addHistorySnapshot } = useHistorySnapshot()

const url = ref('')

const updateURL = () => {
  if (!handleElementId.value) return
  slidesStore.updateElement({ id: handleElementId.value, props: { url: url.value } })
  addHistorySnapshot()
}
</script>
```
```html
<script lang="ts" setup>
import FrameStylePanel from './FrameStylePanel.vue'
  
const panelMap = {
  [ElementTypes.TEXT]: TextStylePanel,
  [ElementTypes.IMAGE]: ImageStylePanel,
  [ElementTypes.SHAPE]: ShapeStylePanel,
  [ElementTypes.LINE]: LineStylePanel,
  [ElementTypes.CHART]: ChartStylePanel,
  [ElementTypes.TABLE]: TableStylePanel,
  [ElementTypes.LATEX]: LatexStylePanel,
  [ElementTypes.VIDEO]: VideoStylePanel,
  [ElementTypes.AUDIO]: AudioStylePanel,
  [ElementTypes.FRAME]: FrameStylePanel, // add
}
</script>
```

### Creating an Element
This is the last step in defining a new element. First, write a method for creating an element:
```typescript
// src\hooks\useCreateElement.ts

const createFrameElement = (url: string) => {
  createElement({
    type: 'frame',
    id: nanoid(10),
    width: 800,
    height: 480,
    rotate: 0,
    left: (VIEWPORT_SIZE - 800) / 2,
    top: (VIEWPORT_SIZE * viewportRatio.value - 480) / 2,
    url,
  })
}
```
Then use it in the insert toolbar:
```html
<!-- src\views\Editor\CanvasTool\index.vue -->

<template>
  <div class="canvas-tool">
    <div class="add-element-handler">
      <!-- add -->
      <span class="handler-item" @click="createFrameElement('https://v3.cn.vuejs.org/')">Insert Web Page</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  createImageElement,
  createChartElement,
  createTableElement,
  createLatexElement,
  createVideoElement,
  createAudioElement,
  createFrameElement, // add
} = useCreateElement()
</script>
```
Click the [Insert Web Page] button and you will see a web page element added to the canvas.

### Summary
At this point, this is the basic process of defining a custom element. The whole process is quite tedious, but not complicated. The key lies in the definition of the element structure and the writing of the element component, which determine the capabilities and appearance the new element will have. Everything else can be done by following the pattern.

In addition, there are some non-essential adjustments: for example, if you want export to support the new element, you need to extend the relevant export methods; if you want the theme feature to apply to the new element, you need to extend the relevant theme methods, and so on.