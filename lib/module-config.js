'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = exports.config = [{
  'libraryName': 'antd',
  'libraryPath': 'antd/lib/${name}/index.js',
  'namePolicy': 'dash',
  'cssDirectory': 'antd/lib/${name}/style/index.css'
}, {
  'libraryName': 'material-ui',
  'libraryPath': 'material-ui/${name}/index.js',
  'namePolicy': 'camel',
  'cssDirectory': ''
}, {
  'libraryName': 'xcui',
  'libraryPath': 'xcui/lib/${name}.js',
  'namePolicy': 'dash',
  'cssDirectory': 'xcui/css/${name}.css'
}, {
  'libraryName': 'element-ui',
  'libraryPath': 'element-ui/lib/${name}.js',
  'namePolicy': 'dash',
  'cssDirectory': 'element-ui/theme-default/${name}.css'
}, {
  'libraryName': 'd3',
  'libraryPath': 'd3-${name}/index.js',
  'namePolicy': 'dash',
  'cssDirectory': ''
}];