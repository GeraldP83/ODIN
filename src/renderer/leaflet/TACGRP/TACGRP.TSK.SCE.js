import L from 'leaflet'
import * as R from 'ramda'
import { arc } from '../features/geo-helper'
import { shape } from '../features/react-shape'
import '../features/Arc'

const SCE = L.TACGRP.Arc.extend({

  _shape (group, options) {
    return shape(group, options, {
      points: ({ C, radius, radians }) => {
        const steps = 32
        const delta = radians.delta / steps
        const xs = R.range(0, steps + 1).map(x => radians.start + x * delta)
        const inner = arc(C, radius)(xs)
        return [inner, this._arrow(inner[inner.length - 1], radians.end, radius / 5)]
      }
    })
  }
})


L.Feature['G*T*S-----'] = (feature, options) => {
  options.labels = () => {
    const alpha = radians => radians.start + radians.delta / 2
    return [{
      placement: ({ C, radius, radians }) => arc(C, radius)([alpha(radians)])[0],
      lines: ['S'],
      'font-size': 18,
      angle: ({ radians }) => alpha(radians) / Math.PI * 180
    }]
  }

  return new SCE(feature, options)
}
