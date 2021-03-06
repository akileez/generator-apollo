// from: https://github.com/jessehouchins/handlebars-helpers
(function() {
  module.exports.register = function(Handlebars, options) {
    Handlebars.Utils.j4 = {

      verbRx: /^(in|not in|is|is a|is an|not|typeof|==|===|!=|!==|<|<=|>|>=|&&|\|\|)$/,
      arrayChecks: ['any','all','no'],

      scope: function(originalScope, args){
        var scopeIndex = args.indexOf('do') + 1 || args.indexOf('DO') + 1
        return scopeIndex ? args[scopeIndex] : originalScope
      },

      verbIndex: function(args) {
        for (var i = 0; i < args.length; i++) {
          if (typeof args[i] === 'string' && args[i].match(this.verbRx)) return i
        }
      },

      realTypeof: function(x){
        return typeof x === 'object' ? Object.prototype.toString.call(x).replace(/^\[object |\]$/g,'').toLowerCase() : typeof x
      },

      conditionOK: function(prop, verb, condition){
        var index = ([].concat(condition)).indexOf(prop)
        switch (verb) {
          case '==':        return prop == condition
          case '===':       return prop === condition
          case 'not':       return prop != condition
          case '!=':        return prop != condition
          case '!==':       return prop !== condition
          case '<':         return prop < condition
          case '<=':        return prop <= condition
          case '>':         return prop > condition
          case '>=':        return prop >= condition
          case '||':        return prop || condition
          case '&&':        return prop && condition
          case 'in':        return ~index
          case 'not in':    return !~index
          case 'typeof':
          case 'is':
          case 'is a':
          case 'is an':     return this.realTypeof(prop) === condition
          default:          return prop && !Handlebars.Utils.isEmpty(prop)
        }
      },

      conditionArgs: function(args){
        var result = {}

        // Find the verb and condition
        var verbIndex = this.verbIndex(args)
        result.verb = args[verbIndex]
        result.condition = args[verbIndex+1]

        // Determine the type of check (any, all, no)
        var checkMultiple = this.arrayChecks.indexOf(args[0]) !== -1
        result.type = checkMultiple && args[0] || 'all'

        // Find the context
        var context
        if (checkMultiple) {
          context = args.slice(1, verbIndex)
        } else {
          context = (typeof args[0] === "function") ? args[0].call(this) : args[0]
          context = [].concat(context)
        }
        result.context = context

        // Prop Name (for any, all, no)
        var contextHasProp = checkMultiple && typeof context[0] === 'object' && typeof context[context.length-1] === 'string'
        result.propName = contextHasProp && context.pop()

        // Check items in an array when it's the only context and checkMultiple is enabled
        if (checkMultiple && Array.isArray(context[0]) && context.length === 1) result.context = context[0]

        return result
      },

      ifOK: function(args){
        args = this.conditionArgs(args)
        var propName = args.propName
        var context = args.context
        var all = args.type === 'all'
        var any = args.type === 'any'

        // Check for any, all, or no mathces the hard way
        if (all && !context.length) return
        for (var i = 0, matches = 0; i < context.length; i++){
          var prop = context[i]
          if (propName && prop.hasOwnProperty && prop.hasOwnProperty(propName)) prop = prop[propName]
          if (this.conditionOK(prop, args.verb, args.condition)) matches++
          if (all && i === matches) return false // all
          else if (any && matches > 0) return true // any
        }
        return all || !any && !matches
      }

    }

    Handlebars.registerHelper('if', function() {
      var j4 = Handlebars.Utils.j4
      var args = Array.prototype.slice.call(arguments)
      var options = args.pop()
      var scope = j4.scope(this, args)

      if (j4.ifOK(args)){
        return options.fn(scope)
      } else {
        return options.inverse(scope)
      }
    })


    Handlebars.registerHelper('unless', function(context) {
      var args = arguments
      var options = args[args.length - 1]
      var fn = options.fn, inverse = options.inverse
      options.fn = inverse
      options.inverse = fn

      return Handlebars.helpers['if'].apply(this, args)
    })


    // {{#each things 'where' 'prop' '<' foo}}

    Handlebars.registerHelper('each', function(context) {
      var j4 = Handlebars.Utils.j4
      var args = Array.prototype.slice.call(arguments)
      var options = args.pop()
      args = j4.conditionArgs(args)
      var fn = options.fn, inverse = options.inverse
      var i = 0, ret = "", data, match

      if (options.data) {
        data = Handlebars.createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if(context instanceof Array){
          for(var j = context.length; i<j; i++) {
            if (j4.conditionOK(context[i], args.verb, args.condition)) {
              match = true
              if (data) data.index = i
              ret = ret + fn(context[i], { data: data })
            }
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key) && j4.conditionOK(context[key], args.verb, args.condition)) {
              match = true
              if (data) data.key = key
              ret = ret + fn(context[key], {data: data})
              i++
            }
          }
        }
      }

      if (!match) ret = inverse(this)

      return ret
    })

  };
}).call(this);
