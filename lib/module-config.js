'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function camel2Dash(_str) {
  var str = _str[0].toLowerCase() + _str.substr(1);
  return str.replace(/([A-Z])/g, function ($1) {
    return '-' + $1.toLowerCase();
  });
}

var config = exports.config = [{
  'libraryName': 'antd',
  'libraryDirectory': 'lib',
  'style': true,
  'getPath': function getPath(name) {
    return 'antd/lib/' + name;
  }
}, {
  'libraryName': 'material-ui',
  'libraryDirectory': '',
  'getPath': function getPath(name) {
    return 'material-ui/' + name;
  }
}, {
  'libraryName': 'xcui',
  'libraryDirectory': 'components',
  'getPath': function getPath(name) {
    return 'xcui/' + camel2Dash(name);
  }
}, {
  'libraryName': 'iview',
  'libraryDirectory': 'components',
  'getPath': function getPath(name) {
    return 'xcui/' + camel2Dash(name);
  }
}, {
  'libraryName': 'element-ui',
  'libraryDirectory': 'libs',
  'getPath': function getPath(name) {
    return 'element-ui/libs/' + camel2Dash(name);
  }
}, {
  'libraryName': 'd3',
  'libraryDirectory': '',
  'getPath': function getPath(name) {
    return 'd3-' + camel2Dash(name);
  }
}, {
  'libraryName': 'amazeui',
  'libraryDirectory': 'components' // default: lib
}];