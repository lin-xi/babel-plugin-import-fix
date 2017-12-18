'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var types = _ref.types;

  var plugins = null;

  function applyInstance(method, args, context) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var plugin = _step.value;

        if (plugin[method]) {
          plugin[method].apply(plugin, [].concat(_toConsumableArray(args), [context]));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  function Program(path, _ref2) {
    var _ref2$opts = _ref2.opts,
        opts = _ref2$opts === undefined ? {} : _ref2$opts;

    // Init plugin instances once.
    if (!plugins) {
      var libs = _moduleConfig.config;
      if (Array.isArray(opts)) {
        opts.forEach(function (opt) {
          if (libs.some(function (item) {
            if (item.libraryName === opt.libraryName) {
              item.libraryPath = opt.libraryPath;
              item.namePolicy = opt.namePolicy;
              item.cssPath = opt.cssPath;
              return true;
            }
            return false;
          })) {
            return false;
          } else {
            libs.push(opt);
          }
        });
      }
      plugins = libs.map(function (_ref3) {
        var libraryName = _ref3.libraryName,
            libraryPath = _ref3.libraryPath,
            namePolicy = _ref3.namePolicy,
            cssPath = _ref3.cssPath,
            camel2DashComponentName = _ref3.camel2DashComponentName,
            camel2UnderlineComponentName = _ref3.camel2UnderlineComponentName,
            fileName = _ref3.fileName;

        (0, _assert2.default)(libraryName, 'libraryName should be provided');
        return new _plugin2.default(libraryName, libraryPath, namePolicy, cssPath, camel2DashComponentName, camel2UnderlineComponentName, fileName, types);
      });
    }
    applyInstance("Program", arguments, this); // eslint-disable-line
  }

  var methods = ['ImportDeclaration', 'CallExpression', 'MemberExpression', 'Property', 'VariableDeclarator', 'LogicalExpression', 'ConditionalExpression', 'IfStatement', 'ExpressionStatement', 'ReturnStatement', 'ExportDefaultDeclaration', 'BinaryExpression'];

  var ret = {
    visitor: { Program: Program }
  };

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var method = _step2.value;

      ret.visitor[method] = function () {
        // eslint-disable-line
        applyInstance(method, arguments, ret.visitor); // eslint-disable-line
      };
    };

    for (var _iterator2 = methods[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return ret;
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _plugin = require('./plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _moduleConfig = require('./module-config.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = exports['default'];