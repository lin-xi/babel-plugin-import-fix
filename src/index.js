import assert from 'assert'
import Plugin from './Plugin'
import moduleConfig from './module-config.js'

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
      opts = moduleConfig
      if (Array.isArray(opts)) {
        opts = moduleConfig.concat(opts)
      }
      plugins = opts.map(
        ({
          libraryName,
          libraryDirectory,
          style,
          camel2DashComponentName,
          camel2UnderlineComponentName,
          fileName
        }) => {
          assert(libraryName, 'libraryName should be provided')
          return new Plugin(
            libraryName,
            libraryDirectory,
            style,
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
}
