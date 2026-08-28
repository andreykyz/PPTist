import { i18n } from '@/i18n'

const t = i18n.global.t

export const enum KEYS {
  C = 'C',
  X = 'X',
  Z = 'Z',
  Y = 'Y',
  A = 'A',
  G = 'G',
  L = 'L',
  F = 'F',
  D = 'D',
  B = 'B',
  P = 'P',
  O = 'O',
  R = 'R',
  T = 'T',
  MINUS = '-',
  EQUAL = '=',
  DIGIT_0 = '0',
  DELETE = 'DELETE',
  UP = 'ARROWUP',
  DOWN = 'ARROWDOWN',
  LEFT = 'ARROWLEFT',
  RIGHT = 'ARROWRIGHT',
  ENTER = 'ENTER',
  SPACE = ' ',
  TAB = 'TAB',
  BACKSPACE = 'BACKSPACE',
  ESC = 'ESCAPE',
  PAGEUP = 'PAGEUP',
  PAGEDOWN = 'PAGEDOWN',
  F5 = 'F5',
}

interface HotkeyItem {
  type: string
  children: {
    label: string
    value?: string
  }[] 
}

export const HOTKEY_DOC: HotkeyItem[] = [
  {
    type: 'hotkey.general',
    children: [
      { label: 'hotkey.generalKeys.cut', value: 'Ctrl + X' },
      { label: 'hotkey.generalKeys.copy', value: 'Ctrl + C' },
      { label: 'hotkey.generalKeys.paste', value: 'Ctrl + V' },
      { label: 'hotkey.generalKeys.pastePlain', value: 'Ctrl + Shift + V' },
      { label: 'hotkey.generalKeys.pasteQuick', value: 'Ctrl + D' },
      { label: 'hotkey.generalKeys.selectAll', value: 'Ctrl + A' },
      { label: 'hotkey.generalKeys.undo', value: 'Ctrl + Z' },
      { label: 'hotkey.generalKeys.redo', value: 'Ctrl + Y' },
      { label: 'hotkey.generalKeys.delete', value: 'Delete / Backspace' },
      { label: 'hotkey.generalKeys.multiSelect', value: t('hotkeyDesc.ctrlOrShift') },
      { label: 'hotkey.generalKeys.searchReplace', value: 'Ctrl + F' },
      { label: 'hotkey.generalKeys.print', value: 'Ctrl + P' },
      { label: 'hotkey.generalKeys.closeDialog', value: 'ESC' },
    ],
  },
  {
    type: 'hotkey.slideshow',
    children: [
      { label: 'hotkey.slideshowKeys.start', value: 'F5' },
      { label: 'hotkey.slideshowKeys.fromCurrent', value: 'Shift + F5' },
      { label: 'hotkey.slideshowKeys.prev', value: '↑ / ← / PgUp' },
      { label: 'hotkey.slideshowKeys.next', value: '↓ / → / PgDown' },
      { label: 'hotkey.slideshowKeys.nextEnterSpace', value: 'Enter / Space' },
      { label: 'hotkey.slideshowKeys.exit', value: 'ESC' },
    ],
  },
  {
    type: 'hotkey.slideEdit',
    children: [
      { label: 'hotkey.slideEditKeys.newSlide', value: 'Enter' },
      { label: 'hotkey.slideEditKeys.pan', value: t('hotkeyDesc.spaceDrag') },
      { label: 'hotkey.slideEditKeys.zoom', value: t('hotkeyDesc.ctrlWheel') },
      { label: 'hotkey.slideEditKeys.zoomIn', value: 'Ctrl + =' },
      { label: 'hotkey.slideEditKeys.zoomOut', value: 'Ctrl + -' },
      { label: 'hotkey.slideEditKeys.fitScreen', value: 'Ctrl + 0' },
      { label: 'hotkey.slideEditKeys.prevSlide', value: '↑' },
      { label: 'hotkey.slideEditKeys.nextSlide', value: '↓' },
      { label: 'hotkey.slideEditKeys.prevMousewheel', value: t('hotkeyDesc.scrollUp') },
      { label: 'hotkey.slideEditKeys.nextMousewheel', value: t('hotkeyDesc.scrollDown') },
      { label: 'hotkey.slideEditKeys.fastText', value: t('hotkeyDesc.dblClickEmpty') },
      { label: 'hotkey.slideEditKeys.fastRect', value: 'R' },
      { label: 'hotkey.slideEditKeys.fastCircle', value: 'O' },
      { label: 'hotkey.slideEditKeys.fastLine', value: 'L' },
      { label: 'hotkey.slideEditKeys.exitDraw', value: t('hotkeyDesc.rightClick') },
    ],
  },
  {
    type: 'hotkey.elementOp',
    children: [
      { label: 'hotkey.elementOpKeys.move', value: '↑ / ← / ↓ / →' },
      { label: 'hotkey.elementOpKeys.lock', value: 'Ctrl + L' },
      { label: 'hotkey.elementOpKeys.group', value: 'Ctrl + G' },
      { label: 'hotkey.elementOpKeys.ungroup', value: 'Ctrl + Shift + G' },
      { label: 'hotkey.elementOpKeys.layerTop', value: 'Alt + F' },
      { label: 'hotkey.elementOpKeys.layerBottom', value: 'Alt + B' },
      { label: 'hotkey.elementOpKeys.lockAspect', value: t('hotkeyDesc.ctrlOrShift') },
      { label: 'hotkey.elementOpKeys.quickCopy', value: t('hotkeyDesc.ctrlDrag') },
      { label: 'hotkey.elementOpKeys.straightLine', value: t('hotkeyDesc.ctrlOrShift') },
      { label: 'hotkey.elementOpKeys.switchFocus', value: 'Tab' },
      { label: 'hotkey.elementOpKeys.confirmCrop', value: 'Enter' },
      { label: 'hotkey.elementOpKeys.finishShape', value: 'Enter' },
    ],
  },
  {
    type: 'hotkey.tableEdit',
    children: [
      { label: 'hotkey.tableEditKeys.focusNext', value: 'Tab' },
      { label: 'hotkey.tableEditKeys.moveFocus', value: '↑ / ← / ↓ / →' },
      { label: 'hotkey.tableEditKeys.insertRowUp', value: 'Ctrl + ↑' },
      { label: 'hotkey.tableEditKeys.insertRowDown', value: 'Ctrl + ↓' },
      { label: 'hotkey.tableEditKeys.insertColLeft', value: 'Ctrl + ←' },
      { label: 'hotkey.tableEditKeys.insertColRight', value: 'Ctrl + →' },
    ],
  },
  {
    type: 'hotkey.chartEdit',
    children: [
      { label: 'hotkey.chartEditKeys.focusNextRow', value: 'Enter' },
    ],
  },
  {
    type: 'hotkey.textEdit',
    children: [
      { label: 'hotkey.textEditKeys.bold', value: 'Ctrl + B' },
      { label: 'hotkey.textEditKeys.italic', value: 'Ctrl + I' },
      { label: 'hotkey.textEditKeys.underline', value: 'Ctrl + U' },
      { label: 'hotkey.textEditKeys.inlineCode', value: 'Ctrl + E' },
      { label: 'hotkey.textEditKeys.superscript', value: 'Ctrl + ;' },
      { label: 'hotkey.textEditKeys.subscript', value: `Ctrl + '` },
      { label: 'hotkey.textEditKeys.selectParagraph', value: `ESC` },
    ],
  },
  {
    type: 'hotkey.other',
    children: [
      { label: 'hotkey.otherKeys.pasteImageSystem' },
      { label: 'hotkey.otherKeys.dragImage' },
      { label: 'hotkey.otherKeys.pasteSvg' },
      { label: 'hotkey.otherKeys.pastePexels' },
      { label: 'hotkey.otherKeys.pasteTextSystem' },
      { label: 'hotkey.otherKeys.dragText' },
      { label: 'hotkey.otherKeys.markdownSyntax' },
    ],
  },
]