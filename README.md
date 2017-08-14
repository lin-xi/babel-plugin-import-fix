# babel-plugin-import-fix


alter import module to certain module file path for smaller bundle file and better performance

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

## extend usage:

you can overwrite the config or add new config like this:

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
      'cssDirectory': 'xcui/css/${name}.css'
    },
  ]]]
}
```
-------

## name policy

three policy are supported

+ dash, date-picker
+ camel, DatePicker
+ underline, date_picker

-------

## default config:

```javascript
[
  {
    'libraryName': 'antd',
    'libraryPath': 'antd/lib/${name}/index.js',
    'namePolicy': 'dash',
    'cssDirectory': 'antd/lib/${name}/style/index.css'
  },
  {
    'libraryName': 'material-ui',
    'libraryPath': 'material-ui/${name}/index.js',
    'namePolicy': 'camel',
    'cssDirectory': ''
  },
  {
    'libraryName': 'xcui',
    'libraryPath': 'xcui/lib/${name}.js',
    'namePolicy': 'dash',
    'cssDirectory': 'xcui/css/${name}.css'
  },
  {
    'libraryName': 'element-ui',
    'libraryPath': 'element-ui/lib/${name}.js',
    'namePolicy': 'dash',
    'cssDirectory': 'element-ui/theme-default/${name}.css'
  },
  {
    'libraryName': 'd3',
    'libraryPath': 'd3-${name}/index.js',
    'namePolicy': 'dash',
    'cssDirectory': ''
  }
]
```

-------


## thanks:

https://github.com/ant-design/babel-plugin-import
