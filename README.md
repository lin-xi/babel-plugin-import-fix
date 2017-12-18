# babel-plugin-import-fix

[![Build Status](https://travis-ci.org/lin-xi/babel-plugin-import-fix.svg?branch=master)](https://travis-ci.org/lin-xi/babel-plugin-import-fix)
[![Coverage Status](https://coveralls.io/repos/github/lin-xi/babel-plugin-import-fix/badge.svg?branch=master)](https://coveralls.io/github/lin-xi/babel-plugin-import-fix?branch=master)
[![npm package](https://img.shields.io/npm/v/babel-plugin-import-fix.svg)](https://www.npmjs.org/package/babel-plugin-import-fix)
[![NPM downloads](http://img.shields.io/npm/dm/babel-plugin-import-fix.svg)](https://npmjs.org/package/babel-plugin-import-fix)



alter import module to certain module file path for smaller bundle file and better performance

主要功能是修改import，缩小import的范围，减少bundle文件大小，提升性能

-------

```javascript
import {Button} from 'antd';
```

after fix:

```javascript
import {Button} from 'antd/lib/button';
import 'antd/lib/button/style'
```
these fixies are made on ast.
bundle file size decrease from 1.5Mb to 286Kb.

-------

## how to use

```bash
npm install babel-plugin-import-fix -D
```

config it in your .babelrc

在.babelrc里进行配置

.babelrc
```javascript
{
  "presets": [
    ["es2015", { "modules": false }], "react"
  ],
  "plugins": ["import-fix"]
}
```

-------

## supported framework

| framework | status  |
| :------------ |:---------------:|
| xcui         |✅        |
| antd         |✅        |
| elementUI    |✅        |
| material-ui  |✅        |
| d3           |✅        |
-------

more library will be supported increasingly

默认直接支持这些库，不需要配置，会不断增加支持的类型

## extend usage:

you can overwrite the config or add new config like this:

扩展支持的库，如果没有css，可以不写cssPath，或设置为空

.babelrc
```javascript
{
  "presets": [
    ["es2015", { "modules": false }], "react"
  ],
  "plugins": [["import-fix", [
    {
      'libraryName': 'xcui',
      'libraryPath': 'xcui/lib/${name}.js',
      'namePolicy': 'dash',
      'cssPath': ['xcui/lib/css/common.css', 'xcui/lib/css/${name}.css']
    },
    {
      'libraryName': 'antd',
      'libraryPath': 'antd/lib/${name}/index.js',
      'namePolicy': 'dash',
      'cssPath': 'antd/lib/${name}/style/index.css'
    }
  ]]]
}
```

cssPath can be a string or an array or an empty string, if you hava multiple css files to import, use an array.
you may igonre cssPath if you don't need.

cssPath可以是字符或数组


-------

## name policy

three policy are supported

namePolicy选项

+ dash, date-picker
+ camel, DatePicker
+ underline, date_picker

-------

## default config:

默认配置

```javascript
[
  {
    'libraryName': 'antd',
    'libraryPath': 'antd/lib/${name}/index.js',
    'namePolicy': 'dash',
    'cssPath': 'antd/lib/${name}/style/index.css'
  },
  {
    'libraryName': 'material-ui',
    'libraryPath': 'material-ui/${name}/index.js',
    'namePolicy': 'camel',
    'cssPath': ''
  },
  {
    'libraryName': 'xcui',
    'libraryPath': 'xcui/lib/${name}.js',
    'namePolicy': 'dash',
    'cssPath': ['xcui/lib/css/common.css', 'xcui/lib/css/${name}.css']
  },
  {
    'libraryName': 'element-ui',
    'libraryPath': 'element-ui/lib/${name}.js',
    'namePolicy': 'dash',
    'cssPath': ['element-ui/lib/theme-default/base.css', 'element-ui/lib/theme-default/${name}.css']
  },
  {
    'libraryName': 'd3',
    'libraryPath': 'd3-${name}/index.js',
    'namePolicy': 'dash',
    'cssPath': ''
  }
]
```

-------


## thanks:

https://github.com/ant-design/babel-plugin-import
