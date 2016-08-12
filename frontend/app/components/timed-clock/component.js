import Component from 'ember-component'
import { later } from 'ember-runloop'
import moment    from 'moment'

export default Component.extend({
  init() {
    this._super(...arguments)

    this._tick()
  },

  _rotate(deg) {
    return `rotate(${deg}deg)`
  },

  _update() {
    let now    = moment()
    let second = now.seconds() * 6
    let minute = now.minutes() * 6 + second / 60
    let hour   = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12

    this.$('.second').css('transform', this._rotate(second))
    this.$('.minute').css('transform', this._rotate(minute))
    this.$('.hour'  ).css('transform', this._rotate(hour))
  },

  _tick() {
    later(() => {
      this._update()
      this._tick()
    }, 1000)
  }
})