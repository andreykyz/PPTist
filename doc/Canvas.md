## Canvas and Elements

#### The Basic Structure of the Editor
```
└──Editor
    ├── Top menu bar
    ├── Left navigation bar
    ├── Right navigation bar
    ├── Upper-middle insert/toolbar
    ├── Bottom speaker notes
    └── Canvas
         ├── Visible area
         │    ├── Editable elements
         │    └── Mouse selection box
         │
         └── Canvas tools
              ├── Guide lines
              ├── Rulers
              ├── Element operation node layer (e.g. drag-resize points)
              ├── Snap alignment lines
              └── Visible area background
```

#### The Basic Principle of the Canvas
Let's focus on the relatively complex [Canvas] part. Every element in the canvas is described by a set of data, for example:
```typescript
interface PPTBaseElement {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
}
```
As the name implies, `left` represents the element's position relative to the top-left corner of the canvas, `width` represents the element's width, and so on.
The key point to understand is: the visible area defaults to a base ratio of 1000 pixels wide by 562.5 pixels high. That is, regardless of the actual size of the canvas and visible area, an element of `{ width: 1000px, height: 562.5px, left: 0, top: 0 }` will always fill the entire visible area exactly.
The concrete implementation is simple: assuming the actual width of the visible area is 1200px, calculate the scale ratio as 1200 / 1000 = 1.2, then scale all elements in the visible area by 1.2 times.
Similarly, the [Thumbnail] and [Presentation Page] are essentially just visible areas of a smaller or larger actual size.
> Note: The 1000×562.5 width and height can be adjusted by modifying `viewportSize` in `src/store/slides.ts`.

#### Elements Within the Canvas
In addition to the position and size information above, more data can be carried. Taking a text element as an example:
```typescript
interface PPTTextElement {
  type: 'text';
  id: string;
  left: number;
  top: number;
  lock?: boolean;
  groupId?: string;
  width: number;
  height: number;
  link?: string;
  content: string;
  rotate: number;
  defaultFontName: string;
  defaultColor: string;
  outline?: PPTElementOutline;
  fill?: string;
  lineHeight?: number;
  wordSpace?: number;
  opacity?: number;
  shadow?: PPTElementShadow;
}
```
You can define a `rotate` to represent the rotation angle of the text box, an `opacity` to represent the transparency of the text box, and so on. During implementation, you only need to render the element component according to the data you defined, and the essence of editing an element is modifying these data values.
The above is the most basic composition of a canvas.