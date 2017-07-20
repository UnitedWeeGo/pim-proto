const {
  FuseBox,
  SVGPlugin,
  CSSPlugin,
  QuantumPlugin,
  WebIndexPlugin,
  BabelPlugin,
} = require('fuse-box')

const prod = process.env.NODE_ENV === 'production'

// @TODO add compatibility enhancements here with cssnano, babel-preset-env, etc
let fuse = new FuseBox({
  cache: true,
  log: true,
  debug: true,
  homeDir: './',
  sourcemaps: true,
  output: 'build/$name.js',
  alias: {
    ui: '~src/ui',
  },
  // http://fuse-box.org/page/configuration#custom-modules-folder
  modulesFolder: 'modules',
  plugins: [
    BabelPlugin({
      config: {
        sourceMaps: true,
        presets: ['es2015'],
        plugins: [
          'transform-react-jsx',
          'transform-decorators-legacy',
          'transform-class-properties',
          // add-module-exports
        ],
      },
    }),
    WebIndexPlugin({
      title: 'Minimal',
      template: 'assets/index.html',
    }),
    CSSPlugin(
      {
        // @NOTE in dev, disabling it just adds it to <head>
        // group: 'app.css',
        // outFile: res(`build/app.css`),
      }
    ),

    // @NOTE for production tree shaking
    // QuantumPlugin(),
  ],
})

fuse.dev()

const bundler = fuse
  .bundle('app')
  .instructions('> src/index.js +[src/styles/*.css]')

if (!prod) bundler.sourceMaps({project: true, vendor: true})
if (!prod) bundler.watch('src/**').hmr()

fuse.run()
