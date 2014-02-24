var createElement = require('../lib/createElement');
var extend        = require('../lib/extend');

module.exports.register = function(Handlebars, options) {
  'use strict';
  var helpers = {};

  function sectionContainer (tag, body, options) {
    var element;

    element = createElement(tag, true, extend({}, options.hash), body);
    return options.fn ? element : new Handlebars.SafeString(element);
  };

  helpers.section = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    return sectionContainer('section', body, options);
  };

  helpers.article = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    return sectionContainer('article', body, options);
  };

  helpers.aside = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    return sectionContainer('aside', body, options);
  };

  helpers.header = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    return sectionContainer('header', body, options);
  };

  helpers.footer = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    return sectionContainer('footer', body, options);
  };

  helpers.div = function (body, options) {
    if (typeof body === 'object') {
      body = '';
    }
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    return sectionContainer('div', body, options);
  };

  helpers.container = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;
    var element = createElement('div', true, extend({class: 'container'}, options.hash), body);
    return options.fn ? element : new Handlebars.SafeString(element);
  };

  helpers.row = function (body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this) || body;

    var element = createElement('div', true, extend({class: 'row'}, options.hash), body);
    return options.fn ? element : new Handlebars.SafeString(element);
  };

  helpers.column = function (columns, body, options) {
    options = Array.prototype.pop.call(arguments);
    body = options.fn && options.fn(this);
    var element = createElement('div', true, extend({class: 'col-' + columns}, options.hash), body);

    return options.fn ? element : new Handlebars.SafeString(element);
  };

  for(var index in helpers){
      Handlebars.registerHelper(index, helpers[index]);
    }
    return this;

};