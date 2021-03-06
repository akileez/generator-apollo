// from: https://github.com/danharper/Handlebars-Helpers
(function() {
  module.exports.register = function(Handlebars, options) {
    var isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    var ExpressionRegistry = function() {
        this.expressions = [];
    };

    ExpressionRegistry.prototype.add = function (operator, method) {
        this.expressions[operator] = method;
    };

    ExpressionRegistry.prototype.call = function (operator, left, right) {
        if ( ! this.expressions.hasOwnProperty(operator)) {
            throw new Error('Unknown operator "'+operator+'"');
        }

        return this.expressions[operator](left, right);
    };

    var eR = new ExpressionRegistry;
    eR.add('not', function(left, right) {
        return left !== right;
    });
    eR.add('gt', function(left, right) {
        return left > right;
    });
    eR.add('lt', function(left, right) {
        return left < right;
    });
    eR.add('gte', function(left, right) {
        return left >= right;
    });
    eR.add('lte', function(left, right) {
        return left <= right;
    });
    eR.add('eq', function(left, right) {
        return left === right;
    });
    eR.add('or', function(left, right) {
        return left || right;
    });
    eR.add('and', function(left, right) {
        return left && right;
    });
    eR.add('typeof', function(left, right) {
        return typeof left === right;
    });
    eR.add('in', function(left, right) {
        if ( ! isArray(right)) {
            right = right.split(',');
        }
        return right.indexOf(left) !== -1;
    });

    var isHelper = function() {
        var args     = arguments,
            left     = args[0],
            operator = args[1],
            right    = args[2],
            options  = args[3];

        if (args.length == 2) {
            options = args[1];
            if (left) return options.fn(this);
            return options.inverse(this);
        }

        if (args.length == 3) {
            right = args[1];
            options = args[2];
            if (left === right) return options.fn(this);
            return options.inverse(this);
        }

        if (eR.call(operator, left, right)) {
            return options.fn(this);
        }
        return options.inverse(this);
    };

    Handlebars.registerHelper('is', isHelper);

    return eR;


  };
}).call(this);