const config = require('./config.js')
const chokidar = require('chokidar')
const sh = require('./lib/sh.js')

// watcher configuration
const watcher = chokidar.watch(config.paths.local, {
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300
  }
})

// run the watcher
// TODO improve the output formatting (chalk? listr?)
watcher
  .on('ready', () => console.log('watching ' + config.paths.local + '...'))
  .on('all', path => {
    console.log()
    console.log('syncing...')

    sh(
      'rsync -POrt ' +
        config.paths.local +
        '/. ' +
        config.host +
        ':' +
        config.paths.remote
    )

    console.log('done.')
    console.log()
    console.log('watching ' + config.paths.local + '...')
  })
