import { authenticateSession, invalidateSession } from 'timed/tests/helpers/ember-simple-auth'
import { describe, it, beforeEach, afterEach }    from 'mocha'
import destroyApp                                 from '../helpers/destroy-app'
import { expect }                                 from 'chai'
import startApp                                   from '../helpers/start-app'
import testSelector                               from 'ember-test-selectors'

describe('Acceptance | index activities edit', function() {
  let application

  beforeEach(async function() {
    application = startApp()

    let user = server.create('user')

    await authenticateSession(application, { 'user_id': user.id })

    this.activities = server.createList('activity', 5)
  })

  afterEach(async function() {
    await invalidateSession(application)
    destroyApp(application)
  })

  it('can edit an activity', async function() {
    await visit('/')

    await click(find(testSelector('activity-row-id', 1)))

    await taskSelect(testSelector('activity-edit-form'))

    await fillIn(`${testSelector('activity-edit-form')} textarea`, 'Test')

    await click(find('button:contains(Save)'))

    expect(find(`${testSelector('activity-row')} td:eq(1)`).text()).to.equal('Test')
  })

  it('can delete an activity', async function() {
    await visit('/')

    await click(find(testSelector('activity-row-id', 1)))

    await click(find('button:contains(Delete)'))

    expect(find(testSelector('activity-row-id', 1))).to.have.length(0)
    expect(find(testSelector('activity-row'))).to.have.length(4)
  })

  it('can delete an activity block', async function() {
    await visit('/edit/1')

    await click(`${testSelector('activity-block-row-id', 1)} ${testSelector('delete-activity-block')}`)

    expect(find(testSelector('activity-block-row-id', 0))).to.have.length(0)
    expect(find(testSelector('activity-block-row'))).to.have.length(0)
  })

  it('can add an activity block', async function() {
    await visit('/edit/1')

    await click(find(testSelector('add-activity-block')))

    expect(find(testSelector('activity-block-row'))).to.have.length(2)
  })

  it('can\'t delete an active activity', async function() {
    await visit('/')

    await click(find(`${testSelector('activity-row-id', 1)} ${testSelector('start-activity')}`))
    await click(find(testSelector('activity-row-id', 1)))

    await click(find('button:contains(Delete)'))

    expect(find('button:contains(Delete)').is(':disabled')).to.be.ok
    expect(find(testSelector('activity-row-id', 1))).to.have.length(1)
  })

  it('closes edit window when clicking on the currently edited activity row', async function() {
    await visit('/')

    await click(find(testSelector('activity-row-id', 1)))

    expect(currentURL()).to.equal('/edit/1')

    await click(find(testSelector('activity-row-id', 2)))

    expect(currentURL()).to.equal('/edit/2')

    await click(find(testSelector('activity-row-id', 2)))

    expect(currentURL()).to.equal('/')
  })
})
