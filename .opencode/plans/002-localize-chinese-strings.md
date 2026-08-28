# 002-Complete Chinese String Localization

## Goal
Find and localize all remaining Chinese strings hardcoded in source files to support English and Russian translations.

## Current State

### i18n System
- **Library**: vue-i18n v9 (compositional API, legacy: false)
- **Languages**: zh (Chinese, source of truth), en (English), ru (Russian)
- **Translation files**: `src/i18n/locale/en.ts` (766 lines), `zh.ts` (840 lines), `ru.ts` (742 lines)
- **Usage in Vue**: `const { t } = useI18n()` with `t('key.path')`
- **Usage in TS**: Import `{ i18n }` from `@/i18n`, use `i18n.global.t`

### Previous Work (Plan 001)
~80% of the project is already localized with ~400+ translation keys across 3 languages.

---

## Analysis Results

### Phase 1 - Missing Translation Keys

**en.ts missing (6 keys from zh.ts):**
- `elPosition.layerTop` - "置顶"
- `elPosition.layerBottom` - "置底"
- `elPosition.layerUp` - "上移"
- `elPosition.layerDown` - "下移"
- `generic.width` - "宽度"
- `generic.height` - "高度"

**ru.ts missing (20+ keys from zh.ts):**
- `canvasTool.insertFormula` - "插入公式"
- `canvasTool.formulaLabel` - "公式"
- `canvasTool.mediaLabel` - "音视频"
- `canvasTool.artText` - "艺术字"
- `canvasTool.icons` - "图标表情"
- `canvasTool.shapePool` - "形状库"
- `elAnimation.changeAnimation` - "更换动画"
- `elPosition.layerTop/Bottom/Up/Down` (4 keys)
- `generic.width/height` (2 keys)
- `aippt.topics[]` - topic suggestions array
- Animation group names (12 keys): `animation.*`
- Animation effect names (~100 keys): `animation.*` (bouncing, fading, rotating, zooming, flying, exit effects, emphasis)
- Transition types (~12 keys): `slideTransition.*`
- Symbol categories: `symbol.emoji` - "Emoji"
- Chart types (8 keys): `chart.*`
- Default chart labels (10 keys): `chart.category*`, `chart.series*`, `chart.value`, `chart.coordinate`, `chart.legend`
- Clip path shapes (20 keys): `clipShape.*`
- Line/shape category labels
- Font names (11 keys): `font.*`
- Rich text panel: `richText.aiRewrite.*`
- Table toolbar: `tableToolbar.*` (~9 keys)
- Floating toolbar: `floatToolbar.*` (~12 keys)
- Style panel labels: `stylePanel.*` (~20 keys)
- Dialog/panel keys: `linkDialog.*`, `notesPanel.*`, `latexEditor.*`, `chartDataEditor.*` (~20 keys)
- Context menu keys: `contextMenu.*` (~15 keys)
- Video/player: `videoPlayer.*`
- Template/component keys: `templates.loading`, `sections.placeholder`
- Export defaults: `export.seriesName`
- Message/popup keys: `message.popup.*`

### Phase 2 - Hardcoded Chinese in Source Files (~120 unique clusters across 50+ files)

#### Priority: HIGH (Core UI - high frequency)

| Files | Items | Strategy |
|-------|-------|----------|
| `src/configs/animation.ts` | ~120 animation effects (弹跳, 浮现, 旋转, 缩放, 滑入, 飞入, exit, emphasis) | Add i18n keys, use `i18n.global.t` in file, export as objects |
| `src/configs/chart.ts` | 8 chart types + 10 default labels | Same pattern as animation.ts |
| `src/configs/imageClip.ts` | 20 clip shape names (矩形, 圆角矩形, etc.) | Add `clipShape.*` i18n keys |
| `src/configs/shapes.ts` | 5 shape categories | Add `shapes.*` i18n keys |
| `src/configs/symbol.ts` | 5 symbol categories | Add `symbol.*` i18n keys |
| `src/configs/lines.ts` | 2 line types | Add `lines.*` i18n keys |
| `src/configs/font.ts` | 11 font names | Add `font.*` i18n keys |
| `src/configs/hotkey.ts` | 10 hotkey descriptions | Add `hotkeyDesc.*` i18n keys |
| `src/configs/latex.ts` | LaTeX config labels | Add `latex.*` i18n keys |
| Floating toolbar 7 Vue files | ~20 button/label strings | Replace with `t()` calls |

#### Priority: HIGH (Style Panels - frequently visible)

| Files | Items | Strategy |
|-------|-------|----------|
| `ElementShadow.vue` | 5 labels (启用阴影, 水平阴影, etc.) | Replace `:title="..."` with `t()` |
| `ElementColorMask.vue` | 2 labels | Same |
| `ElementOutline.vue` | 4 labels | Same |
| `ElementFilter.vue` | 1+ labels | Same |
| `ElementOpacity.vue` | 1 label | Same |
| `ElementFlip.vue` | 2 labels | Same |

#### Priority: MEDIUM (Dialogs, panels, context menus)

| Files | Items | Strategy |
|-------|-------|----------|
| `LinkDialog.vue` | 4 keys | Replace hardcoded strings with `t()` |
| `LinkHandler.vue` | 3 strings | Replace with `t()` |
| `NotesPanel.vue` | 2-3 computed strings | Use `t()` with interpolation |
| `SelectPanel.vue` | 1 title string | Use `t()` with interpolation |
| `ViewportSizeSetting.vue` | 7 keys | Replace with `t()` |
| `SlideDesignPanel/index.vue` | 14+ button labels | Replace with `t()` |
| `MultiStylePanel.vue` | 1 label | Replace with `t()` |
| `EditableElement.vue` | ~16 context menu items | Replace `text: '...'` with `t('...')` |
| `Thumbnails/index.vue` | ~15 context menu items | Replace with `t()` |

#### Priority: MEDIUM (Templates, components)

| Files | Items | Strategy |
|-------|-------|----------|
| `Thumbnails/index.vue` | placeholder, section labels | Replace with `t()` |
| `Templates.vue` | Loading, insert all, insert template | Replace with `t()` |
| `SlideList.vue` | "添加幻灯片", "无幻灯片" | Replace with `t()` |
| `ChartDataEditor.vue` | ~5 labels + template literal strings | Replace with `t()` |
| `LaTeXEditor/index.vue` | ~4 strings | Replace with `t()` |
| `TableToolbar.vue` | ~9 labels | Replace with `t()` |
| `BorderPanel.vue` | 4 labels | Replace with `t()` |
| `FontPicker.vue` | Font search label | Replace with `t()` |

#### Priority: LOW (Edge cases, hooks, less frequent)

| Files | Items | Strategy |
|-------|-------|----------|
| `useExport.ts` | `系列${i}` chart series name | Replace with `t() + interpolation` |
| `useImport.ts` | `坐标${i}` labels | Replace with `t() + interpolation` |
| `Canvas/index.vue` | "启用/禁用" message | Replace with `t()` |
| `VideoPlayer/index.vue` | "循环开/关", "视频加载失败" | Replace with `t()` |
| `EditableTable/index.vue` | "双击编辑" | Replace with `t()` |
| `ColorPicker/index.vue` | "最近使用" | Replace with `t()` |
| `ImageStylePanel.vue` | "按X：" label | Replace with `t()` |
| `AIPPTDialog.vue` | Style options (教育风, 营销风) | Replace with `t()` |
| `SymbolPanel.vue` | Emoji category names | Replace with `t()` |
| `ImageLibPanel.vue` | Default search "风景" | Replace with `t()` |
| `Remark/Editor.vue` | Placeholder "点击输入演讲者备注" | Replace with `t()` |
| `OutlineEditor.vue` | Context menu (~10 items) | Replace with `t()` |

---

## Implementation Steps

### Step 1: Add missing keys to en.ts
Add the 6 missing translation keys to `src/i18n/locale/en.ts`:
- `elPosition.layerTop`, `elPosition.layerBottom`, `elPosition.layerUp`, `elPosition.layerDown`
- `generic.width`, `generic.height`

### Step 2: Add missing keys to ru.ts
Add all missing translation keys from zh.ts to `src/i18n/locale/ru.ts`.

### Step 3: Define i18n keys for config files

Add new sections to all 3 locale files:

```
animation.group.*          // 弹跳, 浮现, 旋转, 缩放, etc.
animation.effect.*         // ~100 individual animation effects
slideTransition.*          // 无, 随机, 左右推移, etc.
chart.categoryName.*       // 类别1-5, 系列1-2
clipShape.*                // 矩形, 圆角矩形, etc.
font.names.*               // 默认字体, 思源黑体, etc.
shape.categories.*         // 矩形, 常用形状, etc.
symbol.categories.*        // 字母, 序号, etc.
line.types.*               // 直线, 折线, etc.
tableToolbar.*             // 填充, 添加, 删除, etc.
floatToolbar.*             // 裁剪, 替换, 编辑数据, etc.
stylePanel.*               // 启用阴影, 边框粗细, etc.
common.*                   // 取消, 确认, 确定, 清空数据, etc.
videoPlayer.*               // 循环, 开, 关, 视频加载失败
templateComponent.*         // 加载中, 插入全部, etc.
exportDefaults.*            // 系列名称, 坐标名称
messagePopup.*              // 消息提示
section.*                   // 节名称 placeholders
outlineEditor.*             // 大纲右键菜单
```

### Step 4: Update config files to use i18n

Convert each hardcoded array to use `i18n.global.t`:

```typescript
// src/configs/animation.ts
import { i18n } from '@/i18n'
const t = i18n.global.t

export const animationConfig = {
  bounce: {
    group: t('animation.group.bounce'),
    effects: [
      { label: t('animation.effect.bounceIn'), value: 'bounceIn' },
      // ...
    ],
  },
}
```

### Step 5: Fix floating toolbar Vue components

For each of the 7 toolbar components:
1. Add `import { useI18n } from 'vue-i18n'` + `const { t } = useI18n()`
2. Replace all hardcoded Chinese strings with `t('floatToolbar.xxx')`
3. For Chinese-only colons like `:` in text, use `:title="t('...')"` or handle gracefully

### Step 6: Fix style panel components

Fix ElementShadow, ElementColorMask, ElementOutline, ElementFilter, ElementOpacity, ElementFlip:
1. Add useI18n
2. Replace all `:title="..."` with `:title="t('stylePanel.xxx')"`
3. Update zh.ts/en.ts/ru.ts with `stylePanel.*` section

### Step 7: Fix dialogs and panels

LinkDialog, NotesPanel, SelectPanel, ViewportSizeSetting, LaTeXEditor, ChartDataEditor:
1. Replace hardcoded strings with `t()`
2. Template literal strings like `\`幻灯片${n}\`` become `t('linkDialog.slide', { n })` with interpolation

### Step 8: Fix context menus

EditableElement, Thumbnails/index.vue, OutlineEditor:
1. Replace `text: '中文'` with `text: t('contextMenu.xxx')`
2. Add `contextMenu.*` section to all locale files

### Step 9: Fix other Vue components

VideoPlayer, EditableTable, ColorPicker, ImageStylePanel, SymbolPanel, ImageLibPanel, AIPPTDialog, Templates, SlideList:
1. Add useI18n
2. Replace all hardcoded strings
3. Handle template interpolation keys

### Step 10: Fix TypeScript hooks

useExport.ts, useImport.ts, Canvas/index.vue:
1. Import `i18n, useI18n` pattern
2. Replace hardcoded `系列${i}` and `坐标${i}` with `t()` + interpolation

---

## Key Naming Convention

```
section.entity.property    // e.g., elPosition.layerTop
section.action             // e.g., floatToolbar.cut
section.label              // e.g., stylePanel.enableShadow
section.placeholder        // e.g., linkDialog.linkPlaceholder
section.group              // e.g., animation.group.bounce
section.effect             // e.g., animation.effect.bounceIn
section.default            // e.g., exportDefaults.seriesName
```

## Interpolation Syntax

For dynamic strings with variable content, use vue-i18n v9 interpolation:
- zh.ts: `'幻灯片X的批注'` → key: `notes.title` value: `'幻灯片 {{current}}的批注'`
- Usage: `t('notes.title', { current: index + 1 })`

## Locale File Updates Needed

### en.ts additions (~70 keys)
- `elPosition.layerTop/Bottom/Up/Down`, `generic.width/height`
- `animation.group/*`, `animation.effect/*`, `slideTransition/*`
- `clipShape/*`, `font.names/*`, `chart.categoryName/*`
- `tableToolbar/*`, `floatToolbar/*`, `stylePanel/*`
- `contextMenu/*`, `common/*`, `videoPlayer/*`
- `templateComponent/*`, `exportDefaults/*`, `messagePopup/*`
- `section/*`, `outlineEditor/*`, `latexEditor/*`, `chartDataEditor/*`
- `aippt.topics[]`
- `font.names` entries for Chinese font names

### ru.ts additions (~70 keys)
- Same as en.ts plus all missing zh.ts keys

### zh.ts additions (~20 keys)
- Chinese font names in `font.names`
- Animation group/effect names if not already present
- Animation transition types

## Scope Summary

| Metric | Count |
|--------|-------|
| Locale files to update | 3 (zh.ts, en.ts, ru.ts) |
| Config files to convert | 8 (animation, chart, imageClip, shapes, symbol, lines, font, hotkey, latex) |
| Vue components to convert | 35+ |
| TS files to convert | 3 |
| Unique keys to add | ~200 |
| Total strings to localize | ~120+ clusters |
