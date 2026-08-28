# PPT_DATA_SCHEMA

> Note: this document is intended specifically for AI generation and is not a complete data definition.

Convention for the default canvas:

- The logical width is fixed at `1000`
- The logical height is fixed at `562.5`
- The origin is fixed at the top-left corner of the page
- Coordinate units are uniformly logical pixels `px`
- Except for lines, elements use a rectangular bounding box by default to express position and size

## Coordinate System and General Rules

### Page Coordinate System

- The page origin is the top-left corner, i.e. `(0, 0)`
- The bottom-right corner of the page defaults to `(1000, 562.5)`
- `x` increases to the right, `y` increases downward

### Common Geometry Fields

The following rules apply to "rectangular elements" such as text, images, shapes, tables, and charts:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Unique element ID, globally unique, e.g. `P01_el_title_01` |
| `left` | `number` | Required | `x` of the top-left corner of the bounding box when the element is not rotated |
| `top` | `number` | Required | `y` of the top-left corner of the bounding box when the element is not rotated |
| `width` | `number` | Required | Width of the element bounding box |
| `height` | `number` | Required | Height of the element bounding box |
| `rotate` | `number` | Required | Clockwise rotation angle in degrees, defaults to `0` |

Note:
- The rotation center of a rectangular element is the center point of the element
- `left/top/width/height` always describe the bounding box "before rotation"

### Shared Style Structure

#### Border `outline`

```json
{
  "style": "solid",
  "width": 2,
  "color": "#333333"
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `style` | `"solid" \| "dashed" \| "dotted"` | Recommended | Border style |
| `width` | `number` | Recommended | Border width |
| `color` | `string` | Recommended | Border color |

#### Shadow `shadow`

```json
{
  "h": 3,
  "v": 3,
  "blur": 2,
  "color": "rgba(0,0,0,0.25)"
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `h` | `number` | Recommended | Horizontal offset |
| `v` | `number` | Recommended | Vertical offset |
| `blur` | `number` | Recommended | Blur radius |
| `color` | `string` | Recommended | Shadow color |

#### Gradient `gradient`

```json
{
  "type": "linear",
  "rotate": 0,
  "colors": [
    { "pos": 0, "color": "#F8FAFF" },
    { "pos": 100, "color": "#E8EEF9" }
  ]
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"linear" \| "radial"` | Required | Gradient type |
| `rotate` | `number` | Recommended | Linear gradient angle |
| `colors` | `{ pos: number; color: string }[]` | Required | Gradient color stops; `pos` ranges from 0 to 100, representing the range `0% ~ 100%` |

### Rich Text Content Constraints

Text elements and text inside shapes both use HTML strings. Only the HTML nodes and inline styles listed below are recognized. **It is strictly forbidden to use tags or styles that are not listed.**

- Block-level tags: `p`, `ul`, `ol`, `li`, `blockquote`
- Inline tags: `strong`, `em`, `u`, `strike`, `sup`, `sub`, `code`
- Inline style tags: `span`

Supported styles:

- `span`: `color`, `background-color`, `font-size`, `font-family`
- `p`: `text-align`
- `ul/ol`: `font-size`, `color`

Rich text examples:

**Single centered paragraph title**

```html
<p style="text-align:center;"><span style="font-size:32px;color:#0F172A;">Annual Business Review</span></p>
```

**Multi-paragraph body text**

```html
<p>Content of the first paragraph.</p>
<p>Content of the second paragraph, where <strong>keywords are shown in bold</strong>.</p>
```

**Unordered list**

```html
<ul>
  <li><p>List item one</p></li>
  <li><p>List item two</p></li>
</ul>
```

> **List format requirement**: the `<li>` tag must wrap a `<p>` tag, e.g. `<li><p>content</p></li>`

### Available Fonts

> Fonts may only be selected from the following list; the default value (when not specified) is the system default font.

- `SourceHanSans`: Source Han Sans (Noto Sans CJK)
- `SourceHanSerif`: Source Han Serif (Noto Serif CJK)
- `WenDingPLKaiTi`: WenDing PL KaiTi
- `WenDingPLSongTi`: WenDing PL SongTi
- `ZhuQueFangSong`: ZhuQue FangSong
- `LXGWWenKai`: LXGW WenKai
- `MiSans`: MiSans
- `SourceSerif4`: Source Serif 4
- `JetBrainsMono`: JetBrains Mono
- `Literata`: Literata
- `Inter`: Inter
- `Roboto`: Roboto
- `OpenSans`: Open Sans
- `Montserrat`: Montserrat
- `SourceSansPro`: Source Sans Pro
- `Merriweather`: Merriweather

## Page Slide

### Minimal Recommended Structure

```json
{
  "id": "slide_P01",
  "background": {
    "type": "solid",
    "color": "#FFFFFF"
  },
  "elements": []
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Unique page ID |
| `background` | `object` | Recommended | Page background, supports solid color and gradient backgrounds |
| `elements` | `array` | Required | Array of elements on this page; the array order is the layer order, and later elements overlay earlier ones |

#### Solid Color Background

```json
{
  "type": "solid",
  "color": "#FFFFFF"
}
```

#### Gradient Background

```json
{
  "type": "gradient",
  "gradient": {
    "type": "linear",
    "rotate": 90,
    "colors": [
      { "pos": 0, "color": "#F8FAFF" },
      { "pos": 100, "color": "#EEF2FF" }
    ]
  }
}
```

Background field description:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"solid" \| "gradient"` | Required | Background type |
| `color` | `string` | Required when `type` is `solid` | Solid background color |
| `gradient` | `object` | Required when `type` is `gradient` | Background gradient, linear or radial |

## Text Element `text`

### Minimal Recommended Structure

```json
{
  "type": "text",
  "id": "P01_el_title_01",
  "left": 72,
  "top": 54,
  "width": 856,
  "height": 72,
  "rotate": 0,
  "content": "<p><strong>Annual Business Analysis</strong></p>",
  "defaultFontName": "SourceHanSans",
  "defaultColor": "#1F2937",
  "fixedHeight": true,
  "vAlign": "middle"
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"text"` | Required | Element type |
| `content` | `string` | Required | Rich text HTML; see Shared Style Structure – Rich Text Content Constraints |
| `defaultFontName` | `string` | Required | Default font, applied when not overridden by inline styles |
| `defaultColor` | `string` | Required | Default text color, applied when not overridden by inline styles |
| `fill` | `string` | Optional | Text box background color |
| `outline` | `object` | Optional | Text box border; see Shared Style Structure |
| `lineHeight` | `number` | Recommended | Line height multiplier, defaults to `1.5` |
| `wordSpace` | `number` | Optional | Letter spacing in `px`, none by default |
| `opacity` | `number` | Optional | Opacity, `0~1` |
| `shadow` | `object` | Optional | Text box shadow; see Shared Style Structure |
| `fixedHeight` | `boolean` | Recommended | Fix the text box height; recommended to set to `true` to ensure stable layout constraints. Omit only when the content should naturally expand downward |
| `vAlign` | `"top" \| "middle" \| "bottom"` | Optional | Text alignment within the fixed text box; only meaningful for stable layout when `fixedHeight: true` |

### Potential Layout Rules

When computing the text box `left / top / width / height`, you must understand:

- There is a `10px` padding between the text content and the top/bottom/left/right edges of the text box
- There is a `5px` paragraph spacing between text paragraphs (`p` tags)
- When setting the text box size, the effects of margins, line height, paragraph spacing, font size, and letter spacing must be taken into account

## Image Element `image`

### Minimal Recommended Structure

```json
{
  "type": "image",
  "id": "P01_el_image_01",
  "left": 650,
  "top": 126,
  "width": 278,
  "height": 182,
  "rotate": 0,
  "src": "https://images.pexels.com/photos/730670/pexels-photo-730670.jpeg",
  "description": "A dark blue business office scene with an Asian woman explaining a growth curve in front of a glass whiteboard, clean lighting, 16:9 composition"
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"image"` | Required | Element type |
| `src` | `string` | Required | Image resource URL; must consistently use the default value `"https://images.pexels.com/photos/730670/pexels-photo-730670.jpeg"` |
| `description` | `string` | Required | Image description, used to generate the image later; must carry the actual visual intent |
| `outline` | `object` | Optional | Image outline border |
| `filters` | `object` | Optional | Image filters |
| `clip` | `object` | Optional | Image clipping |
| `shadow` | `object` | Optional | Shadow; see Shared Style Structure |
| `radius` | `number` | Optional | Corner radius, mainly used for rectangular clipping, e.g. `16` |
| `colorMask` | `string` | Optional | Color mask, a color value with transparency, e.g. `rgba(91, 155, 213, 0.5)` |

### Image Filters `filters`

Example:

```json
{
  "brightness": "108%",
  "contrast": "105%",
  "blur": "2px",
  "opacity": "92%"
}
```

`filter` is essentially a dictionary of CSS filter functions. The above example will ultimately render as:

```css
filter: brightness(108%) contrast(105%) blur(2px) opacity(92%);
```

Supported fields:

| Field | Type | Description |
| --- | --- | --- |
| `blur` | `string` | e.g. `"2px"` |
| `brightness` | `string` | e.g. `"110%"` |
| `contrast` | `string` | e.g. `"105%"` |
| `grayscale` | `string` | e.g. `"100%"` |
| `saturate` | `string` | e.g. `"80%"` |
| `hue-rotate` | `string` | e.g. `"90deg"` |
| `sepia` | `string` | e.g. `"60%"` |
| `invert` | `string` | e.g. `"100%"` |
| `opacity` | `string` | e.g. `"70%"` |

### Image Clipping `clip`

Example:

```json
{
  "shape": "roundRect",
  "range": [[5, 5], [95, 95]]
}
```

Field description:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `shape` | `string` | Recommended | Clipping shape key |
| `range` | `[[number, number], [number, number]]` | Required | Describes the clipping region of the original image as percentages, from the top-left point to the bottom-right point |

`range` description:

- `[[x1, y1], [x2, y2]]` represents the coordinates of the top-left and bottom-right points
- The range is a percentage of the original image, `0` to `100`
- `[[10, 10], [90, 90]]` means cropping the middle 80% region of the original image

Available `shape` values:

- `rect`
- `roundRect`
- `ellipse`
- `triangle`
- `diamond`
- `pentagon`
- `hexagon`

## Shape Element `shape`

### Minimal Recommended Structure

```json
{
  "type": "shape",
  "id": "P01_el_shape_01",
  "left": 72,
  "top": 140,
  "width": 240,
  "height": 52,
  "rotate": 0,
  "viewBox": [1000, 1000],
  "path": "M80 0 L920 0 Q1000 0 1000 80 L1000 920 Q1000 1000 920 1000 L80 1000 Q0 1000 0 920 L0 80 Q0 0 80 0 Z",
  "fill": "#E8F0FF"
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"shape"` | Required | Element type |
| `viewBox` | `[number, number]` | Required | Drawing coordinate system size of the SVG path, formatted as `[width, height]` |
| `path` | `string` | Required | SVG path `d` string |
| `fill` | `string` | Required | Fill color; if there is also a `gradient`, `gradient` takes precedence |
| `gradient` | `object` | Optional | Gradient fill; see Shared Style Structure |
| `outline` | `object` | Optional | Shape border; see Shared Style Structure |
| `opacity` | `number` | Optional | Opacity, `0~1` |
| `shadow` | `object` | Optional | Shadow; see Shared Style Structure |
| `text` | `object` | Optional | Text inside the shape |

### `path` Drawing Specification

- Only standard SVG path commands may be used: `M`, `L`, `Q`, `C`, `A`, `Z`
- Path coordinates are all written in the `viewBox` coordinate system, and it is recommended they match the element's `width / height` ratio

For example, a rectangle with width and height of `200px`:

```json
{
  "width": 200,
  "height": 200,
  "viewBox": [200, 200],
  "path": "M 0 0 L 200 0 L 200 200 L 0 200 L 0 0 Z"
}
```

For example, a circle with width and height of `200px`:

```json
{
  "width": 200,
  "height": 200,
  "viewBox": [200, 200],
  "path": "M 100 0 A 50 50 0 1 1 100 200 A 50 50 0 1 1 100 0 "
}
```

For example, a `300 x 200` rounded rectangle with a corner radius of `40px`:

```json
{
  "width": 300,
  "height": 200,
  "viewBox": [300, 200],
  "path": "M 40 0 L 260 0 Q 300 0 300 40 L 300 160 Q 300 200 260 200 L 40 200 Q 0 200 0 160 L 0 40 Q 0 0 40 0 Z"
}
```

### Text Inside a Shape `text`

Example:

```json
{
  "content": "<p><strong>Core Conclusion</strong></p>",
  "defaultFontName": "SourceHanSans",
  "defaultColor": "#1D4ED8",
  "align": "middle",
  "lineHeight": 1.5,
  "wordSpace": 0,
}
```

Field description:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `string` | Required | Rich text HTML |
| `defaultFontName` | `string` | Required | Default font |
| `defaultColor` | `string` | Required | Default text color |
| `align` | `"top" \| "middle" \| "bottom"` | Required | Vertical alignment of text inside the shape |
| `lineHeight` | `number` | Recommended | Line height multiplier, defaults to `1.5` |
| `wordSpace` | `number` | Optional | Letter spacing, none by default |

## Line Element `line`

### Minimal Recommended Structure

```json
{
  "type": "line",
  "id": "P01_el_line_01",
  "left": 72,
  "top": 230,
  "start": [0, 0],
  "end": [420, 0],
  "width": 2,
  "style": "solid",
  "color": "#CBD5E1",
  "points": ["", ""]
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"line"` | Required | Element type |
| `id` | `string` | Required | Element ID |
| `left` | `number` | Required | Position of the top-left corner of the line's local coordinate system on the page |
| `top` | `number` | Required | Position of the top-left corner of the line's local coordinate system on the page |
| `start` | `[number, number]` | Required | Start point, relative to `left/top` |
| `end` | `[number, number]` | Required | End point, relative to `left/top` |
| `width` | `number` | Required | Line width; this is not the bounding box width |
| `style` | `"solid" \| "dashed" \| "dotted"` | Required | Line style |
| `color` | `string` | Required | Line color |
| `points` | `["" \| "arrow" \| "dot", "" \| "arrow" \| "dot"]` | Required | Endpoint styles for the start and end points |
| `shadow` | `object` | Optional | Shadow; see Shared Style Structure |

### Key Differences Between Lines and Other Elements

- No `height`
- No `rotate`
- `width` represents stroke thickness, not geometric width
- Direction is entirely determined by `start` and `end`
- `left/top` are merely the anchor point of the line's local coordinate system

## Table Element `table`

### Minimal Recommended Structure

```json
{
  "type": "table",
  "id": "P01_el_table_01",
  "left": 72,
  "top": 290,
  "width": 420,
  "height": 180,
  "rotate": 0,
  "outline": {
    "width": 1,
    "style": "solid",
    "color": "#D1D5DB"
  },
  "colWidths": [0.3, 0.35, 0.35],
  "cellMinHeight": 45,
  "data": [
    [
      { "id": "P01_table_01_c_1_1", "colspan": 1, "rowspan": 1, "text": "Region" },
      { "id": "P01_table_01_c_1_2", "colspan": 1, "rowspan": 1, "text": "Revenue" },
      { "id": "P01_table_01_c_1_3", "colspan": 1, "rowspan": 1, "text": "YoY" }
    ],
    [
      { "id": "P01_table_01_c_2_1", "colspan": 1, "rowspan": 1, "text": "East China" },
      { "id": "P01_table_01_c_2_2", "colspan": 1, "rowspan": 1, "text": "32 million" },
      { "id": "P01_table_01_c_2_3", "colspan": 1, "rowspan": 1, "text": "+18%" }
    ]
  ]
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"table"` | Required | Element type |
| `outline` | `object` | Required | Table border; see Shared Style Structure |
| `theme` | `object` | Optional | Table theme color and header/footer row-column markers |
| `colWidths` | `number[]` | Required | Proportion of each column width; the sum should be `1` |
| `cellMinHeight` | `number` | Required | Minimum height of each row |
| `data` | `TableCell[][]` | Required | Two-dimensional cell data |

### Cell `TableCell`

```json
{
  "id": "P01_table_01_c_1_1",
  "colspan": 1,
  "rowspan": 1,
  "text": "Region",
  "style": {
    "bold": true,
    "color": "#111827",
    "backcolor": "#F3F4F6",
    "fontsize": "14px",
    "fontname": "SourceHanSans",
    "align": "center",
    "vAlign": "middle"
  }
}
```

Field description:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Required | Cell ID |
| `colspan` | `number` | Required | Number of columns spanned, defaults to `1` |
| `rowspan` | `number` | Required | Number of rows spanned, defaults to `1` |
| `text` | `string` | Required | Plain text content |
| `style` | `object` | Optional | Cell style |

### Merged Cell Description

Merged cells in a table are expressed through the `rowspan` / `colspan` of the master cell in the top-left corner.

For example:

```json
[
  { "colspan": 3, "rowspan": 1, "text": "Merged row" },
  { "colspan": 1, "rowspan": 1, "text": "" },
  { "colspan": 1, "rowspan": 1, "text": "" }
],
[
  { "colspan": 1, "rowspan": 2, "text": "Merged column" },
  { "colspan": 1, "rowspan": 1, "text": "" },
  { "colspan": 1, "rowspan": 1, "text": "" }
],
[
  { "colspan": 1, "rowspan": 1, "text": "" },
  { "colspan": 1, "rowspan": 1, "text": "" },
  { "colspan": 1, "rowspan": 1, "text": "" }
]
```

### Cell Style `style`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bold` | `boolean` | Optional | Bold |
| `em` | `boolean` | Optional | Italic |
| `underline` | `boolean` | Optional | Underline |
| `strikethrough` | `boolean` | Optional | Strikethrough |
| `color` | `string` | Optional | Text color |
| `backcolor` | `string` | Optional | Cell background color |
| `fontsize` | `string` | Optional | Font size, e.g. `"14px"` |
| `fontname` | `string` | Optional | Font name |
| `align` | `"left" \| "center" \| "right" \| "justify"` | Optional | Horizontal alignment |
| `vAlign` | `"top" \| "middle" \| "bottom"` | Optional | Vertical alignment |

### Table Theme `theme`

```json
{
  "color": "#3B82F6",
  "rowHeader": true,
  "rowFooter": false,
  "colHeader": false,
  "colFooter": false
}
```

Description:

- `color` theme color
- `rowHeader` indicates the first row is treated as a header row
- `rowFooter` indicates the last row is treated as a footer row
- `colHeader` indicates the first column is treated as a header column
- `colFooter` indicates the last column is treated as a footer column

## Chart Element `chart`

### Minimal Recommended Structure

```json
{
  "type": "chart",
  "id": "P01_el_chart_01",
  "left": 528,
  "top": 290,
  "width": 400,
  "height": 220,
  "rotate": 0,
  "chartType": "column",
  "data": {
    "labels": ["Q1", "Q2", "Q3", "Q4"],
    "legends": ["Revenue"],
    "series": [[120, 150, 180, 210]]
  },
  "themeColors": ["#3B82F6", "#93C5FD"],
  "textColor": "#475569",
  "lineColor": "#E2E8F0"
}
```

### Field Description

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | `"chart"` | Required | Element type |
| `fill` | `string` | Optional | Chart container background color |
| `chartType` | `"bar" \| "column" \| "line" \| "pie" \| "ring" \| "area" \| "radar" \| "scatter"` | Required | Chart type |
| `data` | `object` | Required | Chart data |
| `themeColors` | `string[]` | Required | Series theme colors, at least 1 |
| `textColor` | `string` | Optional | Color of axes, labels, and legend text |
| `lineColor` | `string` | Optional | Color of grid lines or radar axis lines |

### Data Structure `data`

```json
{
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "legends": ["Revenue", "Profit"],
  "series": [
    [120, 150, 180, 210],
    [25, 28, 33, 41]
  ]
}
```

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `labels` | `string[]` | Required | Category labels |
| `legends` | `string[]` | Recommended | Series names |
| `series` | `number[][]` | Required | Array of data series |

### Data Constraints

#### Bar / Column / Line / Area Charts

- `labels.length` should equal each `series[i].length`
- `legends.length` should equal `series.length`

#### Pie / Ring Charts

- Only `series[0]` is used
- `series[0].length` should equal `labels.length`
- `labels` represents the name of each sector
- `legends` may hold a single series name, or remain consistent with `labels`, but rendering mainly depends on `labels`

#### Radar Chart

- `labels` represents the name of each radar dimension
- `series[i].length` should equal `labels.length`
- `legends.length` should equal `series.length`

#### Scatter Chart

- `series[0]` is treated as the `x` data
- `series[1]` is treated as the `y` data

## Comprehensive Example Data

```json
{
  "id": "slide_P01",
  "background": {
    "type": "gradient",
    "gradient": {
      "type": "linear",
      "rotate": 0,
      "colors": [
        { "pos": 0, "color": "#F8FBFF" },
        { "pos": 100, "color": "#EEF4FF" }
      ]
    }
  },
  "elements": [
    {
      "type": "text",
      "id": "P01_el_title_01",
      "left": 72,
      "top": 56,
      "width": 856,
      "height": 72,
      "rotate": 0,
      "content": "<p><strong>Q1 2026 Revenue Structure Analysis</strong></p>",
      "defaultFontName": "SourceHanSans",
      "defaultColor": "#0F172A",
      "lineHeight": 1.2
    },
    {
      "type": "text",
      "id": "P01_el_summary_01",
      "left": 72,
      "top": 142,
      "width": 856,
      "height": 96,
      "rotate": 0,
      "content": "<p>This page shows the revenue composition for Q1 2026. Overall, <strong>Enterprise Services</strong> remains the main source of revenue, with Education & Training and Subscription Services providing steady supplementation, while other businesses account for a relatively small share.</p>",
      "defaultFontName": "SourceHanSans",
      "defaultColor": "#334155",
      "lineHeight": 1.5
    },
    {
      "type": "chart",
      "id": "P01_el_chart_01",
      "left": 235,
      "top": 260,
      "width": 530,
      "height": 250,
      "rotate": 0,
      "fill": "#FFFFFF",
      "chartType": "pie",
      "data": {
        "labels": ["Enterprise Services", "Education & Training", "Subscription Services", "Others"],
        "legends": ["Revenue Share"],
        "series": [
          [46, 24, 18, 12]
        ]
      },
      "outline": {
        "width": 1,
        "style": "solid",
        "color": "#E2E8F0"
      },
      "themeColors": ["#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
      "textColor": "#475569",
      "lineColor": "#E2E8F0"
    }
  ]
}