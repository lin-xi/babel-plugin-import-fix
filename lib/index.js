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
      opts = _moduleConfig2.default;
      if (Array.isArray(opts)) {
        opts = _moduleConfig2.default.concat(opts);
      }
      plugins = opts.map(function (_ref3) {
        var libraryName = _ref3.libraryName,
            libraryDirectory = _ref3.libraryDirectory,
            style = _ref3.style,
            camel2DashComponentName = _ref3.camel2DashComponentName,
            camel2UnderlineComponentName = _ref3.camel2UnderlineComponentName,
            fileName = _ref3.fileName;

        (0, _assert2.default)(libraryName, 'libraryName should be provided');
        return new _Plugin2.default(libraryName, libraryDirectory, style, camel2DashComponentName, camel2UnderlineComponentName, fileName, types);
      });
    }
    applyInstance('Program', arguments, this); // eslint-disable-line
  }
};

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Plugin = require('./Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

var _moduleConfig = require('./module-config.js');

var _moduleConfig2 = _interopRequireDefault(_moduleConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = exports['default'];