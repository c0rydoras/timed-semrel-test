import Route                 from 'ember-route'
import service               from 'ember-service/inject'
import $                     from 'jquery'
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin'

export default Route.extend(ApplicationRouteMixin, {
  session: service('session'),

  sessionInvalidated() {
    this.transitionTo('login')
  },

  afterModel() {
    $('body').removeClass('loading-mask')
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate()
    }
  }
})