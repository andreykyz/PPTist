# 003 - Complete Chinese String Localization (Current State)

## Goal
Localize **every remaining user-facing Chinese string** hardcoded in source files into English (en) and Russian (ru), so the editor renders fully in the selected language.

## Current State (verified by scan)

The i18n foundation already exists:
- **Library**: `vue-i18n@9` (compositional API, `legacy: false`), registered in [`src/main.ts`](../../src/main.ts:17)
- **Locale files**: [`src/i18n/locale/zh.ts`](../../src/i18n/locale/zh.ts), [`en.ts`](../../src/i18n/locale/en.ts), [`ru.ts`](../../src/i18n/locale/ru.ts)
- **Helpers**: `useI18n()` in Vue components, `i18n.global.t` in TS modules (already imported by several configs/hooks)
- **Language switcher**: [`src/components/LanguageSwitcher.vue`](../../src/components/LanguageSwitcher.vue:32) already exposes 中文 / English / Русский with localStorage persistence
- **Already migrated**: `animation.ts`, `chart.ts`, `lines.ts`, `font.ts`, `symbol.ts`, `imageClip.ts`, `shapes.ts` partially; EditorHeader, Toolbar tabs, Export dialog, Screen, Mobile (per prior plans 001/002)

Remaining work is isolated to specific files below.

---

## Scan Findings

### Category A - USER-FACING strings (MUST localize)

#### A1. Config / data files (labels shown in UI)
| File | Strings |
|------|---------|
| [`src/configs/latex.ts`](../../src/configs/latex.ts) | Formula labels: 高斯公式, 傅里叶级数, 泰勒展开式, 定积分, 三角恒等式1/2, 和的展开式, 欧拉公式, 贝努利方程, 全微分方程, 非齐次方程, 柯西中值定理, 拉格朗日中值定理, 导数公式, 三角函数积分, 二次曲面, 二阶微分, 方向导数; category labels: 数学, 组合, 函数, 希腊字母 |
| [`src/configs/hotkey.ts`](../../src/configs/hotkey.ts) | Display `value` strings: 按住 Ctrl 或 Shift, Space + 鼠标拖拽, Ctrl + 鼠标滚轮, 鼠标上滚 / PgUp, 鼠标下滚 / PgDown, 双击空白处 / T, 鼠标右键 |
| [`src/configs/shapes.ts`](../../src/configs/shapes.ts) | Category `type` identifiers: 矩形, 常用形状, 箭头, 其他形状, 线性 (verify whether these are used as lookup keys mapped via `t('shapes.*')` before changing) |

#### A2. TypeScript hooks/utils (runtime messages + generated labels)
| File | Strings |
|------|---------|
| [`src/hooks/useExport.ts`](../../src/hooks/useExport.ts) | `系列${i + 1}` chart series name (line ~770); fontFace `微软雅黑` is a font name → keep as technical constant |
| [`src/hooks/useImport.ts`](../../src/hooks/useImport.ts) | `坐标${index + 1}` chart coordinate labels (line ~1229) |
| [`src/utils/clipboard.ts`](../../src/utils/clipboard.ts) | Error messages: `剪贴板为空或者不包含文本`, `浏览器不支持或禁止访问剪贴板，请使用快捷键 Ctrl + V` |

#### A3. Vue components (template + script)
Priority **HIGH** (core editing UI):
- [`src/views/Editor/Thumbnails/index.vue`](../../src/views/Editor/Thumbnails/index.vue) — context menus (删除节, 粘贴, 全选, 新建页面, 幻灯片放映, 剪切, 复制, 复制页面, 删除页面, 增加节, 从当前放映), section placeholder/无标题节/默认节, 添加幻灯片, 幻灯片 X / Y
- [`src/views/Editor/Canvas/ElementFloatLayer/EditableElement.vue`](../../src/views/Editor/Canvas/ElementFloatLayer/EditableElement.vue) — context menu (~16 items: 解锁, 剪切, 复制, 粘贴, 水平居中, 垂直居中, 置于顶层/底层, 上移/下移一层, 设置链接, 取消组合/组合, 全选, 锁定, 删除)
- [`src/views/Editor/Toolbar/ElementStylePanel/ImageStylePanel.vue`](../../src/views/Editor/Toolbar/ElementStylePanel/ImageStylePanel.vue) — `按{{label}}：` prefix
- [`src/views/Editor/Toolbar/ElementStylePanel/TextStylePanel.vue`](../../src/views/Editor/Toolbar/ElementStylePanel/TextStylePanel.vue) — 下边距：, 右边距：
- [`src/views/Editor/Toolbar/SlideDesignPanel/index.vue`](../../src/views/Editor/Toolbar/SlideDesignPanel/index.vue) — 当前色块, 渐变角度, 自定义, 画布尺寸, 搜索字体, 边框样式/颜色/粗细, 水平阴影, 垂直阴影, 模糊距离, 阴影颜色, 文字 Aa, 设置, 设置并应用
- [`src/views/Editor/Toolbar/SlideDesignPanel/ViewportSizeSetting.vue`](../../src/views/Editor/Toolbar/SlideDesignPanel/ViewportSizeSetting.vue) — 自定义画布尺寸, 宽度：, 高度：, 宽高范围, 确认, 取消, canvas bounds warning
- [`src/views/Editor/Toolbar/MultiStylePanel.vue`](../../src/views/Editor/Toolbar/MultiStylePanel.vue) — 边框粗细：
- [`src/views/Editor/Toolbar/common/ElementFilter.vue`](../../src/views/Editor/Toolbar/common/ElementFilter.vue) — filter labels: 模糊, 亮度, 对比度, 灰度, 饱和度, 色相, 褐色, 反转, 不透明度 + preset names: 黑白, 复古, 锐化, 柔和, 暖色, 明亮, 鲜艳
- [`src/views/Editor/CanvasTool/index.vue`](../../src/views/Editor/CanvasTool/index.vue) — tooltips (绘制文字范围, 打开搜索替换面板, 打开批注面板, 打开符号面板, 打开图库面板, etc.)
- [`src/views/Editor/CanvasTool/ShapePool.vue`](../../src/views/Editor/CanvasTool/ShapePool.vue) / [`LinePool.vue`](../../src/views/Editor/CanvasTool/LinePool.vue) — category names (some already via `t('shapes.*')`)
- [`src/views/components/element/TableElement/EditableTable.vue`](../../src/views/components/element/TableElement/EditableTable.vue) — context menu (~15 items) + warnings 表格至少保留一行/一列
- [`src/components/ChartDataEditor.vue`](../../src/components/ChartDataEditor.vue) — 图表类型, 点击更换, 取消, 清空数据, 确认, 类别X, 系列X
- [`src/components/OutlineEditor.vue`](../../src/components/OutlineEditor.vue) — context menu (~10 items), 新的一章/节/项, CSS content 主题/章/节
- [`src/views/Editor/Canvas/index.vue`](../../src/views/Editor/Canvas/index.vue) — bubble-menu enable/disable message, right-click menu (标尺, 网格线, 无/小/中/大, 重置当前页, 气泡菜单, 幻灯片放映)
- [`src/views/Editor/Canvas/ElementFloatLayer/LinkHandler.vue`](../../src/views/Editor/Canvas/ElementFloatLayer/LinkHandler.vue) — 幻灯片页面 X, 更换, 移除
- [`src/views/Editor/Canvas/LinkDialog.vue`](../../src/views/Editor/Canvas/LinkDialog.vue) — 预览：
- [`src/views/Editor/Canvas/ElementFloatLayer/FloatingToolbar/TextStyleControls.vue`](../../src/views/Editor/Canvas/ElementFloatLayer/FloatingToolbar/TextStyleControls.vue) — 搜索字体, 搜索字号
- [`src/components/Select.vue`](../../src/components/Select.vue) — default searchLabel 搜索
- [`src/views/Editor/NotesPanel.vue`](../../src/views/Editor/NotesPanel.vue) — 幻灯片X的批注, 输入批注 interpolation
- [`src/App.vue`](../../src/App.vue) — 数据初始化中，请稍等 ...

Priority **MEDIUM** (dialogs, panels, components):
- [`src/views/Editor/AIPPTDialog.vue`](../../src/views/Editor/AIPPTDialog.vue) — style values (学术风, 职场风, 教育风, 营销风), `recommends` array (~10 topic suggestions)
- [`src/components/LaTeXEditor/index.vue`](../../src/components/LaTeXEditor/index.vue) — 输入 LaTeX 公式, 公式预览, 取消, 确定, 常用符号, 预置公式, 公式不能为空
- [`src/views/Editor/SymbolPanel.vue`](../../src/views/Editor/SymbolPanel.vue) — emoji categories: 表情, 动作, 动植物, 食物, 旅行, 活动, 物品, 符号
- [`src/views/Editor/ImageLibPanel.vue`](../../src/views/Editor/ImageLibPanel.vue) — default search 风景
- [`src/views/Editor/Thumbnails/Templates.vue`](../../src/views/Editor/Thumbnails/Templates.vue) — 加载中..., 插入全部, 插入模板, 全部, 封面, 目录, 过渡, 内容, 结束
- [`src/views/Editor/Remark/Editor.vue`](../../src/views/Editor/Remark/Editor.vue) — placeholder 点击输入演讲者备注
- [`src/views/Editor/Canvas/ShapeCreateCanvas.vue`](../../src/views/Editor/Canvas/ShapeCreateCanvas.vue) — draw instruction message
- [`src/components/ColorPicker/index.vue`](../../src/components/ColorPicker/index.vue) — 最近使用：, ESC close message, 取色吸管初始化失败
- [`src/views/components/element/VideoElement/VideoPlayer/index.vue`](../../src/views/components/element/VideoElement/VideoPlayer/index.vue) — 视频加载失败, 倍速, 循环开/关
- [`src/views/components/element/AudioElement/AudioPlayer.vue`](../../src/views/components/element/AudioElement/AudioPlayer.vue) — 视频加载失败
- [`src/views/components/element/TableElement/index.vue`](../../src/views/components/element/TableElement/index.vue) — 双击编辑
- [`src/views/components/element/ProsemirrorEditor.vue`](../../src/views/components/element/ProsemirrorEditor.vue) — font-loading warning
- [`src/views/components/ThumbnailSlide/index.vue`](../../src/views/components/ThumbnailSlide/index.vue) — 加载中 ...
- [`src/views/Editor/Toolbar/ElementStylePanel/VideoStylePanel.vue`](../../src/views/Editor/Toolbar/ElementStylePanel/VideoStylePanel.vue) / other style panels — labels

### Category B - CODE COMMENTS / DOCSTRINGS (DO NOT localize)
All JSDoc comments and inline `//` comments in `src/hooks/*`, `src/utils/*` (e.g. `useOrderElement.ts`, `useMoveElement.ts`, `useSlideTheme.ts`, `element.ts`, `textParser.ts`, etc.). These are developer documentation, not user-facing text.

### Category C - TECHNICAL / KEEP AS-IS
- `微软雅黑` (Microsoft YaHei) font face in [`useExport.ts`](../../src/hooks/useExport.ts) — font name constant
- LaTeX formula bodies (the `latex:` fields) — mathematical expressions, not translated
- Language names 中文/English/Русский in [`LanguageSwitcher.vue`](../../src/components/LanguageSwitcher.vue) — endonyms, keep native
- Hotkey value fragments embedded in `hotkey.ts` that mix Latin (`Ctrl + F`, `Enter`, `PgUp`) — only the Chinese parts need keys

---

## Execution Plan

### Step 0 - Add missing translation keys to locale files
Add keys for every string above to all three files ([`zh.ts`](../../src/i18n/locale/zh.ts), [`en.ts`](../../src/i18n/locale/en.ts), [`ru.ts`](../../src/i18n/locale/ru.ts)). Ensure en + ru coverage matches zh (no orphan keys). New sections needed:
```
latex.*            formula labels + categories
hotkeyValue.*      display fragments
chart.seriesName   '系列' -> 'Series'
chart.coordName    '坐标' -> 'Coord'
clipboard.*        error messages
thumbnails.*       context menus + section labels
contextMenu.*      element context menus
stylePanel.*       shadow/outline/filter/flip labels
floatToolbar.*     link/font size controls
filter.*           filter + preset labels
viewport.*         custom size dialog
slideDesign.*      color/gradient/shadow/border labels
aippt.style*       style option values
aippt.topics[]     suggested topics (en/ru arrays)
latexEditor.*      LaTeX dialog
symbol.emoji*      emoji categories
templates.*        template panel
imageLib.*         default search
remark.*           speaker notes placeholder
colorPicker.*      recent colors + eyedropper messages
videoPlayer.*      video player labels
audioPlayer.*      audio player labels
tableElement.*     double-click-to-edit + context menu + warnings
prosemirror.*      font loading warning
common.*           cancel/confirm/clear buttons
```

### Step 1 - Migrate TypeScript config files
1. [`src/configs/latex.ts`](../../src/configs/latex.ts) — import `{ i18n }` from `@/i18n`, use `i18n.global.t('latex.xxx')` for `label` fields (keep `latex` field untouched).
2. [`src/configs/hotkey.ts`](../../src/configs/hotkey.ts) — wrap the Chinese display values with `t('hotkeyValue.xxx')`.
3. [`src/configs/shapes.ts`](../../src/configs/shapes.ts) — verify whether category `type` values are consumed as i18n keys by `ShapePool.vue` (`t('shapes.*')`). If they are internal identifiers compared by equality, leave them; do not break the mapping.

### Step 2 - Migrate TypeScript hooks/utils
1. [`src/hooks/useExport.ts`](../../src/hooks/useExport.ts) — replace `` `系列${i + 1}` `` with `t('chart.seriesName', { n: i + 1 })`.
2. [`src/hooks/useImport.ts`](../../src/hooks/useImport.ts) — replace `` `坐标${index + 1}` `` with `t('chart.coordName', { n: index + 1 })`.
3. [`src/utils/clipboard.ts`](../../src/utils/clipboard.ts) — replace the two reject messages with `t('clipboard.*')` (import `i18n`).

### Step 3 - Migrate Vue components (HIGH priority)
For each file: add `const { t } = useI18n()`, replace template literals / attributes / `message.*` strings / context-menu `text:` entries with `t('...')`. Use named interpolation for dynamic segments:
```ts
// Before
computed(() => `幻灯片${slideIndex.value + 1}的批注`)
// After
t('notes.title', { current: slideIndex.value + 1 })
```

### Step 4 - Migrate Vue components (MEDIUM priority)
Same pattern for dialogs, symbol/emoji lists, templates, video/audio players, table element, color picker, remark editor, image lib, AIPPT dialog.

### Step 5 - Handle static template text
For hardcoded text in `<template>` that cannot be a directive expression, use `{{ t('key') }}` or `:title="t('key')"`.

### Step 6 - Verify
1. `npm run type-check` / build passes (the project runs Vue type checking).
2. Manually switch zh / en / ru in [`LanguageSwitcher.vue`](../../src/components/LanguageSwitcher.vue), confirm no untranslated Chinese remains in the editing UI.
3. Search for residual user-facing Chinese with `[\u4e00-\u9fff]` excluding comment lines and docs.
4. Confirm en/ru files have no orphan/missing keys vs zh.

## Key Naming Convention
```
section.entity.property    e.g., contextMenu.lock
section.action             e.g., floatToolbar.changeLink
section.label              e.g., stylePanel.horizontalShadow
section.placeholder        e.g., remark.editorPlaceholder
section.seriesName         e.g., chart.seriesName  (interpolated)
```

## What NOT to Translate
- JSDoc/code comments (Category B)
- Font names, URLs, product names (PPTIST, AIPPT, PPTX, JSON)
- LaTeX formula bodies
- Language endonyms (中文/English/Русский)
- User-generated content (slide text, notes content, chart data values)

## Scope Summary
| Metric | Count |
|--------|-------|
| Locale files to update | 3 (zh/en/ru) |
| TS config files | 2-3 (latex, hotkey, shapes-verify) |
| TS hooks/utils | 3 (useExport, useImport, clipboard) |
| Vue components | ~40 (HIGH ~20, MEDIUM ~20) |
| New i18n keys | ~150-200 across 3 languages |
| Files with only comments (skip) | ~20 hooks + ~15 utils |