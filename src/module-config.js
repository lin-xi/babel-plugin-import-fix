function camel2Dash (_str) {
  const str = _str[0].toLowerCase() + _str.substr(1)
  return str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
}

export const config = [
  {
    'libraryName': 'antd',
    'libraryDirectory': 'lib',
    'style': true,
    'getPath': function (name) {
      return 'antd/lib/' + name
    }
  },
  {
    'libraryName': 'material-ui',
    'libraryDirectory': '',
    'getPath': function (name) {
      return 'material-ui/' + name
    }
  },
  {
    'libraryName': 'xcui',
    'libraryDirectory': 'lib',
    'getPath': function (name) {
      return 'xcui/lib/' + camel2Dash(name)
    }
  },
  {
    'libraryName': 'element-ui',
    'libraryDirectory': 'lib',
    'getPath': function (name) {
      return 'element-ui/lib/' + camel2Dash(name)
    }
  },
  {
    'libraryName': 'd3',
    'libraryDirectory': '',
    'getPath': function (name) {
      return 'd3-' + camel2Dash(name)
    }
  }
]
