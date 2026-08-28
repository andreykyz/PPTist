import type { TurningMode } from '@/types/slides'
import { i18n } from '@/i18n'

const t = i18n.global.t

export const ANIMATION_DEFAULT_DURATION = 1000
export const ANIMATION_DEFAULT_TRIGGER = 'click'
export const ANIMATION_CLASS_PREFIX = 'animate__'

// Access translations lazily so they update when locale changes
function animGroup(key: string): string {
  return t(`animation.group.${key}`)
}

function animEffect(key: string): string {
  return t(`animation.effect.${key}`)
}

function slideTransKey(key: string): string {
  return t(`slideTransition.${key}`)
}

export const ENTER_ANIMATIONS = [
  {
    type: 'bounce',
    name: animGroup('bounce'),
    children: [
      { name: animEffect('bounceIn'), value: 'bounceIn' },
      { name: animEffect('bounceInLeft'), value: 'bounceInLeft' },
      { name: animEffect('bounceInRight'), value: 'bounceInRight' },
      { name: animEffect('bounceInUp'), value: 'bounceInUp' },
      { name: animEffect('bounceInDown'), value: 'bounceInDown' },
    ],
  },
  {
    type: 'fade',
    name: animGroup('fade'),
    children: [
      { name: animEffect('fadeIn'), value: 'fadeIn' },
      { name: animEffect('fadeInDown'), value: 'fadeInDown' },
      { name: animEffect('fadeInDownBig'), value: 'fadeInDownBig' },
      { name: animEffect('fadeInLeft'), value: 'fadeInLeft' },
      { name: animEffect('fadeInLeftBig'), value: 'fadeInLeftBig' },
      { name: animEffect('fadeInRight'), value: 'fadeInRight' },
      { name: animEffect('fadeInRightBig'), value: 'fadeInRightBig' },
      { name: animEffect('fadeInUp'), value: 'fadeInUp' },
      { name: animEffect('fadeInUpBig'), value: 'fadeInUpBig' },
      { name: animEffect('fadeInTopLeft'), value: 'fadeInTopLeft' },
      { name: animEffect('fadeInTopRight'), value: 'fadeInTopRight' },
      { name: animEffect('fadeInBottomLeft'), value: 'fadeInBottomLeft' },
      { name: animEffect('fadeInBottomRight'), value: 'fadeInBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: animGroup('rotate'),
    children: [
      { name: animEffect('rotateIn'), value: 'rotateIn' },
      { name: animEffect('rotateInDownLeft'), value: 'rotateInDownLeft' },
      { name: animEffect('rotateInDownRight'), value: 'rotateInDownRight' },
      { name: animEffect('rotateInUpLeft'), value: 'rotateInUpLeft' },
      { name: animEffect('rotateInUpRight'), value: 'rotateInUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: animGroup('zoom'),
    children: [
      { name: animEffect('zoomIn'), value: 'zoomIn' },
      { name: animEffect('zoomInDown'), value: 'zoomInDown' },
      { name: animEffect('zoomInLeft'), value: 'zoomInLeft' },
      { name: animEffect('zoomInRight'), value: 'zoomInRight' },
      { name: animEffect('zoomInUp'), value: 'zoomInUp' },
    ],
  },
  {
    type: 'slide',
    name: animGroup('slide'),
    children: [
      { name: animEffect('slideInDown'), value: 'slideInDown' },
      { name: animEffect('slideInLeft'), value: 'slideInLeft' },
      { name: animEffect('slideInRight'), value: 'slideInRight' },
      { name: animEffect('slideInUp'), value: 'slideInUp' },
    ],
  },
  {
    type: 'flip',
    name: animGroup('flip'),
    children: [
      { name: animEffect('flipInX'), value: 'flipInX' },
      { name: animEffect('flipInY'), value: 'flipInY' },
    ],
  },
  {
    type: 'back',
    name: animGroup('back'),
    children: [
      { name: animEffect('backInDown'), value: 'backInDown' },
      { name: animEffect('backInLeft'), value: 'backInLeft' },
      { name: animEffect('backInRight'), value: 'backInRight' },
      { name: animEffect('backInUp'), value: 'backInUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: animGroup('lightSpeed'),
    children: [
      { name: animEffect('lightSpeedInRight'), value: 'lightSpeedInRight' },
      { name: animEffect('lightSpeedInLeft'), value: 'lightSpeedInLeft' },
    ],
  },
]

export const EXIT_ANIMATIONS = [
  {
    type: 'bounce',
    name: animGroup('bounce'),
    children: [
      { name: animEffect('bounceOut'), value: 'bounceOut' },
      { name: animEffect('bounceOutLeft'), value: 'bounceOutLeft' },
      { name: animEffect('bounceOutRight'), value: 'bounceOutRight' },
      { name: animEffect('bounceOutUp'), value: 'bounceOutUp' },
      { name: animEffect('bounceOutDown'), value: 'bounceOutDown' },
    ],
  },
  {
    type: 'fade',
    name: animGroup('fade'),
    children: [
      { name: animEffect('fadeOut'), value: 'fadeOut' },
      { name: animEffect('fadeOutDown'), value: 'fadeOutDown' },
      { name: animEffect('fadeOutDownBig'), value: 'fadeOutDownBig' },
      { name: animEffect('fadeOutLeft'), value: 'fadeOutLeft' },
      { name: animEffect('fadeOutLeftBig'), value: 'fadeOutLeftBig' },
      { name: animEffect('fadeOutRight'), value: 'fadeOutRight' },
      { name: animEffect('fadeOutRightBig'), value: 'fadeOutRightBig' },
      { name: animEffect('fadeOutUp'), value: 'fadeOutUp' },
      { name: animEffect('fadeOutUpBig'), value: 'fadeOutUpBig' },
      { name: animEffect('fadeOutTopLeft'), value: 'fadeOutTopLeft' },
      { name: animEffect('fadeOutTopRight'), value: 'fadeOutTopRight' },
      { name: animEffect('fadeOutBottomLeft'), value: 'fadeOutBottomLeft' },
      { name: animEffect('fadeOutBottomRight'), value: 'fadeOutBottomRight' },
    ],
  },
  {
    type: 'rotate',
    name: animGroup('rotate'),
    children: [
      { name: animEffect('rotateOut'), value: 'rotateOut' },
      { name: animEffect('rotateOutDownLeft'), value: 'rotateOutDownLeft' },
      { name: animEffect('rotateOutDownRight'), value: 'rotateOutDownRight' },
      { name: animEffect('rotateOutUpLeft'), value: 'rotateOutUpLeft' },
      { name: animEffect('rotateOutUpRight'), value: 'rotateOutUpRight' },
    ],
  },
  {
    type: 'zoom',
    name: animGroup('zoom'),
    children: [
      { name: animEffect('zoomOut'), value: 'zoomOut' },
      { name: animEffect('zoomOutDown'), value: 'zoomOutDown' },
      { name: animEffect('zoomOutLeft'), value: 'zoomOutLeft' },
      { name: animEffect('zoomOutRight'), value: 'zoomOutRight' },
      { name: animEffect('zoomOutUp'), value: 'zoomOutUp' },
    ],
  },
  {
    type: 'slide',
    name: animGroup('slide'),
    children: [
      { name: animEffect('slideOutDown'), value: 'slideOutDown' },
      { name: animEffect('slideOutLeft'), value: 'slideOutLeft' },
      { name: animEffect('slideOutRight'), value: 'slideOutRight' },
      { name: animEffect('slideOutUp'), value: 'slideOutUp' },
    ],
  },
  {
    type: 'flip',
    name: animGroup('flip'),
    children: [
      { name: animEffect('flipOutX'), value: 'flipOutX' },
      { name: animEffect('flipOutY'), value: 'flipOutY' },
    ],
  },
  {
    type: 'back',
    name: animGroup('back'),
    children: [
      { name: animEffect('backOutDown'), value: 'backOutDown' },
      { name: animEffect('backOutLeft'), value: 'backOutLeft' },
      { name: animEffect('backOutRight'), value: 'backOutRight' },
      { name: animEffect('backOutUp'), value: 'backOutUp' },
    ],
  },
  {
    type: 'lightSpeed',
    name: animGroup('lightSpeed'),
    children: [
      { name: animEffect('lightSpeedOutRight'), value: 'lightSpeedOutRight' },
      { name: animEffect('lightSpeedOutLeft'), value: 'lightSpeedOutLeft' },
    ],
  },
]

export const ATTENTION_ANIMATIONS = [
  {
    type: 'shake',
    name: animGroup('shake'), // reuse bounce name or add shake key
    children: [
      { name: animEffect('shakeX'), value: 'shakeX' },
      { name: animEffect('shakeY'), value: 'shakeY' },
      { name: animEffect('headShake'), value: 'headShake' },
      { name: animEffect('swing'), value: 'swing' },
      { name: animEffect('wobble'), value: 'wobble' },
      { name: animEffect('tada'), value: 'tada' },
      { name: animEffect('jello'), value: 'jello' },
    ],
  },
  {
    type: 'other',
    name: animEffect('other'),
    children: [
      { name: animEffect('bounce'), value: 'bounce' },
      { name: animEffect('flash'), value: 'flash' },
      { name: animEffect('pulse'), value: 'pulse' },
      { name: animEffect('rubberBand'), value: 'rubberBand' },
      { name: animEffect('heartBeat'), value: 'heartBeat' },
    ],
  },
]

interface SlideAnimation {
  label: string
  value: TurningMode
}

// Helper to get translation - uses t from closure to access current locale
export const SLIDE_ANIMATIONS: SlideAnimation[] = [
  { label: slideTransKey('no'), value: 'no' },
  { label: slideTransKey('random'), value: 'random' },
  { label: slideTransKey('slideX'), value: 'slideX' },
  { label: slideTransKey('slideY'), value: 'slideY' },
  { label: slideTransKey('slideX3D'), value: 'slideX3D' },
  { label: slideTransKey('slideY3D'), value: 'slideY3D' },
  { label: slideTransKey('fade'), value: 'fade' },
  { label: slideTransKey('rotate'), value: 'rotate' },
  { label: slideTransKey('scaleY'), value: 'scaleY' },
  { label: slideTransKey('scaleX'), value: 'scaleX' },
  { label: slideTransKey('scale'), value: 'scale' },
  { label: slideTransKey('scaleReverse'), value: 'scaleReverse' },
]
