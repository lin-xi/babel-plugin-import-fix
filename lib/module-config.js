'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = exports.config = [{
  'libraryName': 'antd',
  'libraryPath': 'antd/lib/${name}/index.js',
  'namePolicy': 'dash',
  'cssPath': 'antd/lib/${name}/style/index.css'
}, {
  'libraryName': 'material-ui',
  'libraryPath': 'material-ui/${name}/index.js',
  'namePolicy': 'camel',
  'cssPath': ''
}, {
  'libraryName': 'w-ui',
  'libraryPath': 'w-ui/lib/${name}.js',
  'namePolicy': 'dash',
  'cssPath': ['w-ui/lib/css/common.css', 'w-ui/lib/css/${name}.css']
}, {
  'libraryName': 'xcui',
  'libraryPath': 'xcui/lib/${name}.js',
  'namePolicy': 'dash',
  'cssPath': ['xcui/lib/css/common.css', 'xcui/lib/css/${name}.css']
}, {
  'libraryName': 'element-ui',
  'libraryPath': 'element-ui/lib/${name}.js',
  'namePolicy': 'dash',
  'cssPath': ['element-ui/lib/theme-default/base.css', 'element-ui/lib/theme-default/${name}.css']
}, {
  'libraryName': 'd3',
  'libraryPath': 'd3-${name}/index.js',
  'namePolicy': 'dash',
  'cssPath': ''
}];