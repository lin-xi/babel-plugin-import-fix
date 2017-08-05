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
  'libraryDirectory': 'lib',
  'getPath': function getPath(name) {
    return 'xcui/lib/' + camel2Dash(name);
  }
}, {
  'libraryName': 'element-ui',
  'libraryDirectory': 'lib',
  'getPath': function getPath(name) {
    return 'element-ui/lib/' + camel2Dash(name);
  }
}, {
  'libraryName': 'd3',
  'libraryDirectory': '',
  'getPath': function getPath(name) {
    return 'd3-' + camel2Dash(name);
  }
}];