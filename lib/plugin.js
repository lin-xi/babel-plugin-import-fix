'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function camel2Dash(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase();
  });
}

function camel2Underline(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, function ($1) {
    return '_' + $1.toLowerCase();
  });
}

function winPath(path) {
  return path.replace(/\\/g, '/');
}

var Plugin = function () {
  function Plugin(libraryName, libraryPath, namePolicy, cssPath, camel2DashComponentName, camel2UnderlineComponentName, fileName, types) {
    _classCallCheck(this, Plugin);

    this.specified = null;
    this.libraryObjs = null;
    this.selectedMethods = null;
    this.libraryName = libraryName;
    this.libraryPath = libraryPath;
    this.namePolicy = namePolicy;
    this.libraryPath = libraryPath;
    this.cssPath = cssPath || false;
    this.camel2UnderlineComponentName = camel2UnderlineComponentName;
    this.fileName = fileName || '';
    this.types = types;
  }

  _createClass(Plugin, [{
    key: 'importMethod',
    value: function importMethod(methodName, file) {
      var _this = this;

      if (!this.selectedMethods[methodName]) {
        // const transformedMethodName = this.camel2UnderlineComponentName  // eslint-disable-line
        //   ? camel2Underline(methodName)
        //   : this.camel2DashComponentName
        //     ? camel2Dash(methodName)
        //     : methodName
        // const path = winPath(
        //   join(this.libraryName, libraryDirectory, transformedMethodName, this.fileName)
        // )
        var getPath = function getPath(name) {
          var reg = new RegExp('\\$\{name\}', 'g');
          var finalPath = 'name';
          if (_this.namePolicy === 'dash') {
            finalPath = _this.libraryPath.replace(reg, camel2Dash(name));
          } else if (_this.namePolicy === 'camel') {
            finalPath = _this.libraryPath.replace(reg, name);
          } else if (_this.namePolicy === 'underline') {
            finalPath = _this.libraryPath.replace(reg, camel2Underline(name));
          }
          console.log('[[[[js:', name, '=>', finalPath, ']]]]');
          return finalPath;
        };
        var getCSSPath = function getCSSPath(name, template) {
          var reg = new RegExp('\\$\{name\}', 'g');
          var finalPath = 'name';
          if (_this.namePolicy === 'dash') {
            finalPath = template.replace(reg, camel2Dash(name));
          } else if (_this.namePolicy === 'camel') {
            finalPath = template.replace(reg, name);
          } else if (_this.namePolicy === 'underline') {
            finalPath = template.replace(reg, camel2Underline(name));
          }
          console.log('[[[[css:', name, '=>', finalPath, ']]]]');
          return finalPath;
        };
        var path = winPath(getPath(methodName));
        this.selectedMethods[methodName] = file.addImport(path, 'default');
        if (this.cssPath) {
          var csss = [];
          if (Array.isArray(this.cssPath)) {
            if (this.cssPath.length > 0) {
              csss = this.cssPath;
            }
          } else {
            csss.push(this.cssPath);
          }
          csss.forEach(function (style) {
            file.addImport(getCSSPath(methodName, style), 'style');
          });
        }
      }
      return this.selectedMethods[methodName];
    }
  }, {
    key: 'buildExpressionHandler',
    value: function buildExpressionHandler(node, props, path) {
      var _this2 = this;

      var file = path.hub.file;

      var types = this.types;
      props.forEach(function (prop) {
        if (!types.isIdentifier(node[prop])) return;
        if (_this2.specified[node[prop].name]) {
          node[prop] = _this2.importMethod(_this2.specified[node[prop].name], file); // eslint-disable-line
        }
      });
    }
  }, {
    key: 'buildDeclaratorHandler',
    value: function buildDeclaratorHandler(node, prop, path) {
      var file = path.hub.file;

      var types = this.types;
      if (!types.isIdentifier(node[prop])) return;
      if (this.specified[node[prop].name] && path.scope.hasBinding(node[prop].name) && path.scope.getBinding(node[prop].name).path.type === 'ImportSpecifier') {
        node[prop] = this.importMethod(node[prop].name, file); // eslint-disable-line
      }
    }
  }, {
    key: 'Program',
    value: function Program() {
      this.specified = Object.create(null);
      this.libraryObjs = Object.create(null);
      this.selectedMethods = Object.create(null);
    }
  }, {
    key: 'ImportDeclaration',
    value: function ImportDeclaration(path) {
      var _this3 = this;

      var node = path.node;
      // path maybe removed by prev instances.

      if (!node) return;

      var value = node.source.value;

      var libraryName = this.libraryName;
      var types = this.types;
      if (value === libraryName) {
        node.specifiers.forEach(function (spec) {
          if (types.isImportSpecifier(spec)) {
            _this3.specified[spec.local.name] = spec.imported.name;
          } else {
            _this3.libraryObjs[spec.local.name] = true;
          }
        });
        path.remove();
      }
    }
  }, {
    key: 'CallExpression',
    value: function CallExpression(path) {
      var _this4 = this;

      var node = path.node;
      var file = path.hub.file;
      var name = node.callee.name;

      var types = this.types;

      if (types.isIdentifier(node.callee)) {
        if (this.specified[name]) {
          node.callee = this.importMethod(this.specified[name], file);
        }
      }

      node.arguments = node.arguments.map(function (arg) {
        var argName = arg.name;

        if (_this4.specified[argName] && path.scope.hasBinding(argName) && path.scope.getBinding(argName).path.type === 'ImportSpecifier') {
          return _this4.importMethod(_this4.specified[argName], file);
        }
        return arg;
      });
    }
  }, {
    key: 'MemberExpression',
    value: function MemberExpression(path) {
      var node = path.node;
      var file = path.hub.file;

      // multiple instance check.

      if (!node.object || !node.object.name) return;

      if (this.libraryObjs[node.object.name]) {
        // antd.Button -> _Button
        path.replaceWith(this.importMethod(node.property.name, file));
      } else if (this.specified[node.object.name]) {
        node.object = this.importMethod(this.specified[node.object.name], file);
      }
    }
  }, {
    key: 'Property',
    value: function Property(path, _ref) {
      var opts = _ref.opts;
      var node = path.node;

      this.buildDeclaratorHandler(node, 'value', path, opts);
    }
  }, {
    key: 'VariableDeclarator',
    value: function VariableDeclarator(path, _ref2) {
      var opts = _ref2.opts;
      var node = path.node;

      this.buildDeclaratorHandler(node, 'init', path, opts);
    }
  }, {
    key: 'LogicalExpression',
    value: function LogicalExpression(path, _ref3) {
      var opts = _ref3.opts;
      var node = path.node;

      this.buildExpressionHandler(node, ['left', 'right'], path, opts);
    }
  }, {
    key: 'ConditionalExpression',
    value: function ConditionalExpression(path, _ref4) {
      var opts = _ref4.opts;
      var node = path.node;

      this.buildExpressionHandler(node, ['test', 'consequent', 'alternate'], path, opts);
    }
  }, {
    key: 'IfStatement',
    value: function IfStatement(path, _ref5) {
      var opts = _ref5.opts;
      var node = path.node;

      this.buildExpressionHandler(node, ['test'], path, opts);
      this.buildExpressionHandler(node.test, ['left', 'right'], path, opts);
    }
  }, {
    key: 'ExpressionStatement',
    value: function ExpressionStatement(path, _ref6) {
      var opts = _ref6.opts;
      var node = path.node;
      var types = this.types;

      if (types.isAssignmentExpression(node.expression)) {
        this.buildExpressionHandler(node.expression, ['right'], path, opts);
      }
    }
  }, {
    key: 'ReturnStatement',
    value: function ReturnStatement(path) {
      var types = this.types;
      var node = path.node,
          file = path.hub.file;

      if (node.argument && types.isIdentifier(node.argument) && this.specified[node.argument.name]) {
        node.argument = this.importMethod(node.argument.name, file);
      }
    }
  }, {
    key: 'ExportDefaultDeclaration',
    value: function ExportDefaultDeclaration(path, _ref7) {
      var opts = _ref7.opts;
      var node = path.node;

      this.buildExpressionHandler(node, ['declaration'], path, opts);
    }
  }, {
    key: 'BinaryExpression',
    value: function BinaryExpression(path, _ref8) {
      var opts = _ref8.opts;
      var node = path.node;

      this.buildExpressionHandler(node, ['left', 'right'], path, opts);
    }
  }]);

  return Plugin;
}();

exports.default = Plugin;
module.exports = exports['default'];