var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var models = require('models');
var controllers = require('controllers');
var factories = require('./factories');

describe('Controllers', function() {
  describe('Users', function() {
    beforeEach(function() {
      sinon.stub(models.kanban.user, 'find');
    });

    afterEach(function() {
      models.kanban.user.find.restore();
    });

    it('should find a kanban user', function() {
      var callback = sinon.stub();
      models.kanban.user.find.returns(factories.findUsers);
      controllers.kanban.users.find("john@smith.com", callback);
      sinon.assert.calledWith(callback, null, factories.user);
    });
  });
});
