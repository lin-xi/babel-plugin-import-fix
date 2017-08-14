import assert from 'assert'
import Plugin from './Plugin'
import {config} from './module-config.js'

export default function ({ types }) {
  let plugins = null

  function applyInstance (method, args, context) {
    for (const plugin of plugins) {
      if (plugin[method]) {
        plugin[method].apply(plugin, [...args, context])
      }
    }
  }

  function Program (path, { opts = {} }) {
    // Init plugin instances once.
    if (!plugins) {
      opts = config
      if (Array.isArray(opts)) {
        opts = config.concat(opts)
      }
      plugins = opts.map(
        ({
          libraryName,
          libraryPath,
          namePolicy,
          cssPath,
          camel2DashComponentName,
          camel2UnderlineComponentName,
          fileName
        }) => {
          assert(libraryName, 'libraryName should be provided')
          return new Plugin(
            libraryName,
            libraryPath,
            namePolicy,
            cssPath,
            camel2DashComponentName,
            camel2UnderlineComponentName,
            fileName,
            types
          )
        }
      )
    }
    applyInstance("Program", arguments, this); // eslint-disable-line
  }

  const methods = [
    'ImportDeclaration',
    'CallExpression',
    'MemberExpression',
    'Property',
    'VariableDeclarator',
    'LogicalExpression',
    'ConditionalExpression',
    'IfStatement',
    'ExpressionStatement',
    'ReturnStatement',
    'ExportDefaultDeclaration',
    'BinaryExpression'
  ]

  const ret = {
    visitor: { Program }
  }

  for (const method of methods) {
    ret.visitor[method] = function () { // eslint-disable-line
      applyInstance(method, arguments, ret.visitor);  // eslint-disable-line
    }
  }

  return ret
}
